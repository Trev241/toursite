package humber.ds.toursite.service.imp;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import humber.ds.toursite.enums.PaymentStatus;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.model.Payment;
import humber.ds.toursite.repository.PaymentRepository;
import humber.ds.toursite.repository.BookingRepository;
import humber.ds.toursite.service.PaymentService;

@Service
public class PaymentServiceImp implements PaymentService {
    PaymentRepository paymentRepository;
    BookingRepository bookingRepository;

    @Autowired
    public PaymentServiceImp(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment initiatePayment(PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(paymentRequest.getBookingId()).get();
        paymentRepository.abortPaymentsForBooking(PaymentStatus.ABORTED, booking.getId());

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setTotal(booking.getTotal_price());
        payment.setNetTotal(booking.getTotal_price());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setTransactionTime(new Date());

        return paymentRepository.save(payment);
    }

    @Override
    public Payment applyPromotions(Long id, Coupon coupon) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
        payment.getCoupons().add(coupon);

        double total = payment.getTotal();
        double discount = (total * coupon.getDiscountRate() / 100) + coupon.getFlatDiscount();
        double netTotal = total - discount;
        payment.setDiscount(discount);
        payment.setNetTotal(netTotal);

        return paymentRepository.save(payment);
    }

    @Override
    public Payment checkout(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());

        payment.setStatus(PaymentStatus.SUCCESS);
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> findByBooking(Booking booking) {
        return paymentRepository.findByBooking(booking);
    }

    @Override
    public Payment one(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
    }

    @Override
    public Payment replacePayment(Payment newPayment, Long id) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setTotal(newPayment.getTotal());
            payment.setDiscount(newPayment.getDiscount());
            payment.setNetTotal(newPayment.getNetTotal());
            payment.setTransactionTime(newPayment.getTransactionTime());
            payment.setStatus(newPayment.getStatus());
            payment.setBooking(newPayment.getBooking());

            return payment;
        }).orElseGet(() -> {
            return paymentRepository.save(newPayment);
        });
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    public static class PaymentRequest {
        private Long bookingId;

        public Long getBookingId() {
            return bookingId;
        }
    }

    public static class CheckoutRequest {
        private Long paymentId;

        public Long getPaymentId() {
            return paymentId;
        }
    }
}
