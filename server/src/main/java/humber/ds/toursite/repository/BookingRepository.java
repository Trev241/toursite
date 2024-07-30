package humber.ds.toursite.repository;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findBySiteIdAndStatus(Long siteId, BookingStatus status);

}
