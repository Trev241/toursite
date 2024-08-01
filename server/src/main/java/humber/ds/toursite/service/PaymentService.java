package humber.ds.toursite.service;

import java.util.List;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Payment;
import humber.ds.toursite.service.imp.PaymentServiceImp.PaymentRequest;

public interface PaymentService {
    List<Payment> getAll();

    List<Payment> findByBooking(Booking booking);

    Payment one(Long id);

    Payment replacePayment(Payment payment, Long id);

    List<Payment> initiatePayment(PaymentRequest paymentRequest);

    Payment checkout(Long id);

    void deletePayment(Long id);
}
