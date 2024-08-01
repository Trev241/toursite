package humber.ds.toursite.strategies;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Payment;

public class UpfrontStrategy implements PaymentStrategy {
    @Override
    public List<Payment> execute(Booking booking) {
        Payment payment = new Payment();

        payment.setAmount(booking.getNetTotal());
        payment.setBooking(booking);
        payment.setRequiredBy(LocalDate.now());

        List<Payment> payments = new ArrayList<>();
        payments.add(payment);

        return payments;
    }

}
