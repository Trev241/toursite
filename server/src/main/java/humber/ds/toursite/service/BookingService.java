package humber.ds.toursite.service;

import humber.ds.toursite.model.Booking;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    Booking insertBooking(Long clientId, Long siteId, LocalDate checkInDate, LocalDate checkOutDate);
    List<Booking> getAllBooking();
    void cancelBooking(Long id);
    List<Booking> getBookingsByClientID(Long clientId);
}
