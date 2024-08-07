package humber.ds.toursite.controller;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.BookingSiteDTO;
import humber.ds.toursite.model.BookingUpdateDTO;
import humber.ds.toursite.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BookingController {
    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping(value = "/create-booking", produces = MediaType.APPLICATION_JSON_VALUE)
    public Booking createBooking(
            @RequestParam Long clientId,
            @RequestParam Long siteId,
            @RequestParam LocalDate checkInDate,
            @RequestParam LocalDate checkOutDate) {

        Booking createdBooking = bookingService.insertBooking(clientId, siteId, checkInDate, checkOutDate);
        return createdBooking;
    }

    @GetMapping(value = "/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBooking();
    }

    @GetMapping(value = "/bookings/{id}")
    public Booking one(@PathVariable Long id) {
        return bookingService.one(id);
    }

    @PutMapping("/{bookingId}/cancel")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    @GetMapping(value = "/booking-pending/{clientId}")
    public ResponseEntity<List<Booking>> getAllPendingBookings(@PathVariable Long clientId) {
        List<Booking> bookings = bookingService.getPendingBooking(clientId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping(value = "/booking-all/{clientId}")
    public ResponseEntity<List<BookingSiteDTO>> getAllBookings(@PathVariable Long clientId) {
        List<BookingSiteDTO> bookings = bookingService.getBookingByClientId(clientId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping(value = "/booking-detail/{bookingId}")
    public ResponseEntity<BookingSiteDTO> getBookingDetail(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.getBookingDetail(bookingId));
    }

    @PostMapping("/booking-update/{bookingId}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingUpdateDTO bookingUpdateDTO) {
        Booking updatedBooking = bookingService.updateBookingDate(bookingId, bookingUpdateDTO);
        return ResponseEntity.ok(updatedBooking);
    }
}