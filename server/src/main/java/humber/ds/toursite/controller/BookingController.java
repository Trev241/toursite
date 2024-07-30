package humber.ds.toursite.controller;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/booking")
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
}
