package humber.ds.toursite.service;

import java.util.List;

import humber.ds.toursite.model.Coupon;

public interface CouponService {
    List<Coupon> getAll();

    Coupon saveCoupon(Coupon newCoupon);

    Coupon findByCode(String code);

    Coupon one(Long id);

    Coupon replaceCoupon(Coupon newCoupon, Long id);

    Coupon redeem(String code, Long paymentId);

    void deleteCoupon(Long id);
}
