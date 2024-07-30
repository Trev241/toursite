package humber.ds.toursite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import humber.ds.toursite.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findByCode(String code);
}
