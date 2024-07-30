package humber.ds.toursite.service.serviceImp;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Client;
import humber.ds.toursite.model.Site;
import humber.ds.toursite.repository.BookingRepository;
import humber.ds.toursite.repository.ClientRepository;
import humber.ds.toursite.repository.SiteRepository;
import humber.ds.toursite.service.BookingService;
import humber.ds.toursite.service.EmailService;
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
    private final EmailService emailService;

    @Autowired
    public BookingServiceImp(BookingRepository bookingRepository,
                             ClientRepository clientRepository,
                             SiteRepository siteRepository,
                             EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.clientRepository = clientRepository;
        this.siteRepository = siteRepository;
        this.emailService = emailService;
    }

    @Override
    public Booking insertBooking(Long clientId, Long siteId, LocalDate checkInDate, LocalDate checkOutDate) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID: " + clientId));
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid site ID: " + siteId));

        BookingStatus bookingStatus = checkAvailability(siteId, checkInDate, checkOutDate)
                ? BookingStatus.PROCESSING
                : BookingStatus.PENDING;

        Booking booking = new Booking();
        booking.setClientId(clientId);
        booking.setSiteId(siteId);
        booking.setCheck_in_date(checkInDate);
        booking.setCheck_out_date(checkOutDate);
        booking.setStatus(bookingStatus);
        booking.setBooking_date(LocalDateTime.now());


        int nights = (int) ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        booking.setTotal_price(calculateTotalPrice(site.getPrice(), nights));

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

        booking.setStatus(BookingStatus.CANCELED);
        bookingRepository.save(booking);

        List<Booking> waitingBookings = bookingRepository.findBySiteIdAndStatus(booking.getSiteId(), BookingStatus.PENDING);
        notifyClients(waitingBookings);
    }

    @Override
    public void sendNotify() {

    }

    @Override
    public List<Booking> getBookingsByClientID(Long clientId) {
        return null;
    }


    private double calculateTotalPrice(double pricePerNight, int nights) {
        return pricePerNight * nights;
    }

    private boolean checkAvailability(Long siteId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> bookings = bookingRepository.findBySiteIdAndStatus(siteId, BookingStatus.CONFIRMED);

        return bookings.stream().noneMatch(booking ->
                (checkInDate.isBefore(booking.getCheck_out_date())
                        && checkOutDate.isAfter(booking.getCheck_in_date()))
        );
    }

    private void notifyClients(List<Booking> bookings) {
        Map<Long, Client> notifiedClients = new HashMap<>();
        for (Booking booking : bookings) {

            if (checkAvailability(booking.getSiteId(), booking.getCheck_in_date(), booking.getCheck_out_date())
                && !notifiedClients.containsKey(booking.getClientId())) {
                Client client = clientRepository.findById(booking.getClientId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + booking.getClientId()));

                notifiedClients.put(booking.getClientId(), client);

                String message = String.format("Dear %s, the site you were interested in is now available from %s to %s. Please visit our website to confirm your booking.",
                        client.getUsername(), booking.getCheck_in_date(), booking.getCheck_out_date());
                emailService.sendEmail(client.getEmail(), "Site Availability Notification", message);
                System.out.println(client.getEmail());
                System.out.println(message);
            }
        }
    }

}
