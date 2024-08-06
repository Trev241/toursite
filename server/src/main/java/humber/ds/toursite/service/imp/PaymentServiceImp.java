package humber.ds.toursite.service.imp;

import java.util.ArrayList;
import java.util.List;

import humber.ds.toursite.utils.DateCheck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.enums.PaymentStatus;
import humber.ds.toursite.exceptions.PaymentAlreadyInitiatedException;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Payment;
import humber.ds.toursite.repository.PaymentRepository;
import humber.ds.toursite.repository.BookingRepository;
import humber.ds.toursite.service.PaymentService;
import humber.ds.toursite.strategies.DepositStrategy;
import humber.ds.toursite.strategies.PaymentMode;
import humber.ds.toursite.strategies.PaymentStrategy;
import humber.ds.toursite.strategies.UpfrontStrategy;

@Service
public class PaymentServiceImp implements PaymentService {
    PaymentRepository paymentRepository;
    BookingRepository bookingRepository;
    DateCheck dateCheck = new DateCheck();

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
    public List<Payment> initiatePayment(PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(paymentRequest.getBookingId()).get();
        PaymentStrategy paymentStrategy;
        List<Payment> payments = new ArrayList<>();

        if (booking.getStatus() != BookingStatus.PROCESSING)
            throw new PaymentAlreadyInitiatedException();

        switch (paymentRequest.getPaymentMode()) {
            case DEPOSIT:
                paymentStrategy = new DepositStrategy();
                payments = paymentStrategy.execute(booking);
                break;
            case UPFRONT:
            default:
                paymentStrategy = new UpfrontStrategy();
                payments = paymentStrategy.execute(booking);
                break;
        }

        // Save all payments
        for (Payment payment : payments) {
            payment.setBooking(booking);
            paymentRepository.save(payment);
        }

        // Confirm booking
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        bookingRepository.updateOverlappingBookingsToPending(
                booking.getSiteId(),
                booking.getId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate());

        return payments;
    }

    @Override
    public Payment checkout(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());

        payment.setStatus(PaymentStatus.SUCCESS);

        Booking booking = payment.getBooking();
        booking.setPaymentCompleted(true);
        bookingRepository.save(booking);

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
            payment.setAmount(newPayment.getAmount());
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
        private PaymentMode paymentMode;

        public Long getBookingId() {
            return bookingId;
        }

        public PaymentMode getPaymentMode() {
            return paymentMode;
        }
    }

    public static class CheckoutRequest {
        private Long paymentId;

        public Long getPaymentId() {
            return paymentId;
        }
    }
}
