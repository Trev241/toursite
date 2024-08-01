package humber.ds.toursite.service;

import java.util.List;

import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.model.Payment;
import humber.ds.toursite.service.imp.PaymentServiceImp.PaymentRequest;

public interface PaymentService {
    List<Payment> getAll();

    List<Payment> findByBooking(Booking booking);

    Payment one(Long id);

    Payment replacePayment(Payment payment, Long id);

    Payment initiatePayment(PaymentRequest paymentRequest);

    Payment applyPromotions(Long id, Coupon coupon);

    Payment checkout(Long id);

    void deletePayment(Long id);
}
