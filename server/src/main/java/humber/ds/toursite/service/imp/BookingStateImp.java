package humber.ds.toursite.service.imp;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.service.BookingState;
import org.springframework.stereotype.Service;

@Service
public class BookingStateImp implements BookingState {
    @Override
    public BookingStatus setState(BookingStatus status) {
        return status;
    }
}
