package humber.ds.toursite.strategies;

import java.util.List;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Payment;

public interface PaymentStrategy {
    List<Payment> execute(Booking booking);
}
