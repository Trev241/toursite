package humber.ds.toursite.repository;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.model.Booking;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findBySiteIdAndStatus(Long siteId, BookingStatus status);

    List<Booking> findByClientId(Long clientId);

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByStatusAndPaymentCompletedFalse(BookingStatus bookingStatus);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Booking SET status = 0 " +
            "WHERE status = 1 " +
            "AND site_id = :siteId " +
            "AND id <> :bookingId " +
            "AND (check_in_date <= :checkOutDate AND check_out_date >= :checkInDate)"
            , nativeQuery = true)
    void updateOverlappingBookingsToPending(@Param("siteId") Long siteId,
                                            @Param("bookingId") Long bookingId,
                                            @Param("checkInDate") LocalDate checkInDate,
                                            @Param("checkOutDate") LocalDate checkOutDate);

}
