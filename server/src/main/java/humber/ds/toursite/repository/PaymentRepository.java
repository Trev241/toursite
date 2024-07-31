package humber.ds.toursite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import humber.ds.toursite.enums.PaymentStatus;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Payment;
import jakarta.transaction.Transactional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByBooking(Booking booking);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Payment SET status = :paymentStatus WHERE booking_id = :bookingId", nativeQuery = true)
    void abortPaymentsForBooking(@Param("paymentStatus") PaymentStatus paymentStatus,
            @Param("bookingId") Long bookingId);
}
