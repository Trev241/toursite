package humber.ds.toursite.service;

import humber.ds.toursite.enums.BookingStatus;

public interface BookingState {
    BookingStatus setState(BookingStatus status);
}
