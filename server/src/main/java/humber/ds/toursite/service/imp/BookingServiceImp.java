package humber.ds.toursite.service.imp;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.exceptions.BookingNotFoundException;
import humber.ds.toursite.model.*;
import humber.ds.toursite.repository.BookingRepository;
import humber.ds.toursite.repository.ClientRepository;
import humber.ds.toursite.repository.SiteRepository;
import humber.ds.toursite.service.BookingService;
import humber.ds.toursite.service.BookingState;
import humber.ds.toursite.service.EmailService;
import humber.ds.toursite.utils.DateCheck;
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
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BookingState bookingState;

    DateCheck dateCheck = new DateCheck();

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

        if (!checkOutDate.isAfter(checkInDate)) {
            throw new IllegalArgumentException("Checkout date must be after checkin date.");
        }

        List<Booking> bookings = bookingRepository.findBySiteIdAndStatus(siteId, BookingStatus.CONFIRMED);
        BookingStatus bookingStatus = dateCheck.checkAvailability(bookings, checkInDate, checkOutDate)
                ? bookingState.setState(BookingStatus.PROCESSING)
                : bookingState.setState(BookingStatus.PENDING);

        Booking booking = new Booking();
        booking.setClientId(clientId);
        booking.setSiteId(siteId);
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setStatus(bookingStatus);
        booking.setBookingDate(LocalDateTime.now());
        booking.setPaymentDeadline((checkInDate.minusDays(2)));
        booking.setPaymentCompleted(false);

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

        booking.setStatus(bookingState.setState(BookingStatus.CANCELLED));
        booking.setPaymentCompleted(false);
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
    public List<Booking> getPendingBooking(Long clientId) {
        return bookingRepository.findByClientIdAndStatus(clientId, BookingStatus.PENDING);
    }

    @Override
    public List<BookingSiteDTO> getBookingByClientId(Long clientId) {
        return bookingRepository.findAllByClientIdWithSiteInfo(clientId);
    }

    @Override
    public BookingSiteDTO getBookingDetail(Long bookingId) {
        return bookingRepository.findByBookingId(bookingId);
    }

    @Override
    public Booking updateBookingDate(Long bookingId, BookingUpdateDTO bookingUpdateDTO) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid booking ID: " + bookingId));

        List<Booking> bookings = bookingRepository.findBySiteIdAndStatus(
                bookingUpdateDTO.getSiteId(), BookingStatus.CONFIRMED);
        BookingStatus bookingStatus = dateCheck.checkAvailability(
                bookings, bookingUpdateDTO.getCheckInDate(), bookingUpdateDTO.getCheckOutDate())
                        ? bookingState.setState(BookingStatus.PROCESSING)
                        : bookingState.setState(BookingStatus.PENDING);

        booking.setCheckInDate(bookingUpdateDTO.getCheckInDate());
        booking.setCheckOutDate(bookingUpdateDTO.getCheckOutDate());

        int nights = (int) ChronoUnit.DAYS.between(bookingUpdateDTO.getCheckInDate(),
                bookingUpdateDTO.getCheckOutDate());
        booking.setTotalPrice(calculateTotalPrice(bookingUpdateDTO.getPrice(), nights));
        booking.setNetTotal(calculateTotalPrice(bookingUpdateDTO.getPrice(), nights));
        booking.setStatus(bookingStatus);

        bookingRepository.save(booking);
        return booking;

    }

    private double calculateTotalPrice(double pricePerNight, int nights) {
        return pricePerNight * nights;
    }

    private void notifyClients(List<Booking> bookings, LocalDate canceledCheckIn, LocalDate canceledCheckOut) {
        Map<Long, Client> notifiedClients = new HashMap<>();
        for (Booking booking : bookings) {

            if (dateCheck.datesOverlap(canceledCheckIn, canceledCheckOut,
                    booking.getCheckInDate(), booking.getCheckOutDate())
                    && !notifiedClients.containsKey(booking.getClientId())) {

                Client client = clientRepository.findById(booking.getClientId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + booking.getClientId()));

                notifiedClients.put(booking.getClientId(), client);

                String message = String.format(
                        "Dear %s, the site you were interested in is now available from %s to %s. Please visit our website to confirm your booking.",
                        client.getUsername(), canceledCheckIn, canceledCheckOut);
                emailService.sendEmail(client.getEmail(), "Site Availability Notification", message);
            }
        }
    }
}