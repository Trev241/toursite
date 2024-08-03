package humber.ds.toursite.service.imp;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.exceptions.BookingNotFoundException;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Client;
import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.model.Site;
import humber.ds.toursite.repository.BookingRepository;
import humber.ds.toursite.repository.ClientRepository;
import humber.ds.toursite.repository.SiteRepository;
import humber.ds.toursite.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingServiceImp implements BookingService {
    private final BookingRepository bookingRepository;
    private final ClientRepository clientRepository;
    private final SiteRepository siteRepository;

    @Autowired
    public BookingServiceImp(BookingRepository bookingRepository,
            ClientRepository clientRepository,
            SiteRepository siteRepository) {
        this.bookingRepository = bookingRepository;
        this.clientRepository = clientRepository;
        this.siteRepository = siteRepository;
    }

    @Override
    public Booking one(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException());
    }

    @Override
    public Booking insertBooking(Long clientId, Long siteId, LocalDate checkInDate, LocalDate checkOutDate) {
        clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID: " + clientId));
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid site ID: " + siteId));

        BookingStatus bookingStatus = checkAvailability(siteId, checkInDate, checkOutDate)
                ? BookingStatus.PROCESSING
                : BookingStatus.PENDING;

        Booking booking = new Booking();
        booking.setClientId(clientId);
        booking.setSiteId(siteId);
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setStatus(bookingStatus);
        booking.setBookingDate(LocalDateTime.now());

        int nights = (int) ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        booking.setTotalPrice(calculateTotalPrice(site.getPrice(), nights));
        booking.setNetTotal(booking.getTotalPrice());
        booking.setDiscount(0);

        return bookingRepository.save(booking);
    }

    @Override
    public Booking applyPromotions(Long id, Coupon coupon) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find booking"));
        booking.getCoupons().add(coupon);

        double total = booking.getTotalPrice();
        double discount = (total * coupon.getDiscountRate() / 100) + coupon.getFlatDiscount();
        // Include previous discounts, if any
        booking.setDiscount(booking.getDiscount() + discount);
        booking.setNetTotal(total - booking.getDiscount());

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBooking() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid booking ID: " + id));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        List<Booking> waitingBookings = bookingRepository.findBySiteIdAndStatus(booking.getSiteId(),
                BookingStatus.PENDING);
        notifyClients(waitingBookings, booking.getCheckInDate(), booking.getCheckOutDate());
    }

    @Override
    public List<Booking> getBookingsByClientID(Long clientId) {
        return bookingRepository.findByClientId(clientId);
    }

    @Override
    public List<Booking> getPendingBooking(Long siteId) {
        return bookingRepository.findBySiteIdAndStatus(siteId, BookingStatus.PENDING);
    }

    @Override
    public List<Booking> getProcessingBooking(Long siteId) {
        return bookingRepository.findBySiteIdAndStatus(siteId, BookingStatus.PROCESSING);
    }

    private double calculateTotalPrice(double pricePerNight, int nights) {
        return pricePerNight * nights;
    }

    private boolean checkAvailability(Long siteId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> bookings = bookingRepository.findBySiteIdAndStatus(siteId, BookingStatus.CONFIRMED);

        return bookings.stream().noneMatch(booking -> (checkInDate.isBefore(booking.getCheckOutDate())
                && checkOutDate.isAfter(booking.getCheckInDate())));
    }

    private void notifyClients(List<Booking> bookings, LocalDate canceledCheckIn, LocalDate canceledCheckOut) {
        Map<Long, Client> notifiedClients = new HashMap<>();
        for (Booking booking : bookings) {

            if (datesOverlap(canceledCheckIn, canceledCheckOut,
                    booking.getCheckInDate(), booking.getCheckOutDate())
                    && !notifiedClients.containsKey(booking.getClientId())) {

                Client client = clientRepository.findById(booking.getClientId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + booking.getClientId()));

                notifiedClients.put(booking.getClientId(), client);

                String message = String.format(
                        "Dear %s, the site you were interested in is now available from %s to %s. Please visit our website to confirm your booking.",
                        client.getUsername(), canceledCheckIn, canceledCheckOut);
                // emailService.sendEmail(client.getEmail(), "Site Availability Notification",
                // message);
                System.out.println(client.getEmail());
                System.out.println(message);
            }
        }
    }

    private boolean datesOverlap(LocalDate start1, LocalDate end1, LocalDate start2, LocalDate end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }
}