package humber.ds.toursite.strategies;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Payment;

public class DepositStrategy implements PaymentStrategy {
    private double depositPercent;
    private double paymentRequired;

    public DepositStrategy() {
        this(25.0);
    }

    public DepositStrategy(double depositPercent) {
        this.depositPercent = depositPercent;
    }

    public double getPaymentRequired() {
        return paymentRequired;
    }

    @Override
    public List<Payment> execute(Booking booking) {
        double total = booking.getNetTotal();
        double deposit = total * depositPercent / 100;
        double remnant = total - deposit;

        Payment firstPayment = new Payment();
        firstPayment.setBooking(booking);
        firstPayment.setAmount(deposit);
        firstPayment.setRequiredBy(LocalDate.now());

        Payment finalPayment = new Payment();
        finalPayment.setBooking(booking);
        finalPayment.setAmount(remnant);
        finalPayment.setRequiredBy(booking.getCheckInDate());

        List<Payment> payments = new ArrayList<>();
        payments.add(firstPayment);
        payments.add(finalPayment);

        return payments;
    }
}
