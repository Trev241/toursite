package humber.ds.toursite.utils;

import humber.ds.toursite.model.Booking;

import java.time.LocalDate;
import java.util.List;

public class DateCheck {
    public boolean datesOverlap(LocalDate start1, LocalDate end1, LocalDate start2, LocalDate end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }

    public boolean checkAvailability(List<Booking> bookingsConfirmed, LocalDate checkInDate, LocalDate checkOutDate) {
        return bookingsConfirmed.stream().noneMatch(booking -> (checkInDate.isBefore(booking.getCheckOutDate())
                && checkOutDate.isAfter(booking.getCheckInDate())));
    }
}
