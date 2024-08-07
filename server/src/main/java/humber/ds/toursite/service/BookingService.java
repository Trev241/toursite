package humber.ds.toursite.service;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.BookingSiteDTO;
import humber.ds.toursite.model.BookingUpdateDTO;
import humber.ds.toursite.model.Coupon;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    Booking insertBooking(Long clientId, Long siteId, LocalDate checkInDate, LocalDate checkOutDate);

    List<Booking> getAllBooking();

    Booking one(Long id);

    void cancelBooking(Long id);

    List<Booking> getBookingsByClientID(Long clientId);

    Booking applyPromotions(Long id, Coupon coupon);

    List<Booking> getPendingBooking(Long clientId);

    List<BookingSiteDTO> getBookingByClientId(Long clientId);

    BookingSiteDTO getBookingDetail(Long bookingId);

    Booking updateBookingDate(Long bookingId, BookingUpdateDTO bookingUpdateDTO);
}
