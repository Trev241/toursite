package humber.ds.toursite.service.serviceImp;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Client;
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
import java.util.List;

@Service
public class BookingServiceImp implements BookingService {
    private final BookingRepository bookingRepository;
    private final ClientRepository clientRepository;
    private final SiteRepository siteRepository;

    @Autowired
    public BookingServiceImp(BookingRepository bookingRepository, ClientRepository clientRepository, SiteRepository siteRepository) {
        this.bookingRepository = bookingRepository;
        this.clientRepository = clientRepository;
        this.siteRepository = siteRepository;
    }

    @Override
    public Booking insertBooking(Long clientId, Long siteId, LocalDate checkInDate, LocalDate checkOutDate) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid client ID: " + clientId));
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid site ID: " + siteId));

        Booking booking = new Booking();
        booking.setClientId(clientId);
        booking.setSiteId(siteId);
        booking.setCheck_in_date(checkInDate);
        booking.setCheck_out_date(checkOutDate);
        booking.setBooking_date(LocalDateTime.now());
        booking.setStatus(BookingStatus.PENDING);

        int nights = (int) ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        booking.setTotal_price(calculateTotalPrice(site.getPrice(), nights));

        return bookingRepository.save(booking);
    }

    private double calculateTotalPrice(double pricePerNight, int nights) {
        return pricePerNight * nights;
    }

    @Override
    public List<Booking> getAllBooking() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking updateBookingStatus(Booking booking, Long id) {
        return null;
    }

    @Override
    public void sendNotify() {

    }

    @Override
    public List<Booking> getBookingsByClientID(Long clientId) {
        return null;
    }
}
