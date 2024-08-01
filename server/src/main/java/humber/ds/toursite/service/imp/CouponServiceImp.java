package humber.ds.toursite.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.repository.CouponRepository;
import humber.ds.toursite.service.BookingService;
import humber.ds.toursite.service.CouponService;

@Service
public class CouponServiceImp implements CouponService {
    CouponRepository couponRepository;
    BookingService bookingService;

    @Autowired
    public CouponServiceImp(CouponRepository couponRepository, BookingService bookingService) {
        this.couponRepository = couponRepository;
        this.bookingService = bookingService;
    }

    @Override
    public List<Coupon> getAll() {
        return couponRepository.findAll();
    }

    @Override
    public Coupon saveCoupon(Coupon newCoupon) {
        return couponRepository.save(newCoupon);
    }

    @Override
    public Coupon findByCode(String code) {
        List<Coupon> coupons = couponRepository.findByCode(code);
        return (coupons.isEmpty()) ? null : coupons.get(0);
    }

    @Override
    public Coupon redeem(String code, Long bookingId) {
        List<Coupon> coupons = couponRepository.findByCode(code);
        Coupon coupon = coupons.size() > 0 ? coupons.get(0) : null;

        if (coupon == null || coupon.isRedeemed())
            throw new RuntimeException("Coupon is either invalid or has already been redeemed.");

        coupon.setRedeemed(true);
        bookingService.applyPromotions(bookingId, coupon);
        return couponRepository.save(coupon);
    }

    @Override
    public Coupon one(Long id) {
        return couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
    }

    @Override
    public Coupon replaceCoupon(Coupon newCoupon, Long id) {
        return couponRepository.findById(id).map(coupon -> {
            coupon.setRedeemed(newCoupon.isRedeemed());
            coupon.setDiscountRate(newCoupon.getDiscountRate());
            coupon.setFlatDiscount(newCoupon.getFlatDiscount());

            return coupon;
        }).orElseGet(() -> {
            return couponRepository.save(newCoupon);
        });
    }

    @Override
    public void deleteCoupon(Long id) {
        couponRepository.deleteById(id);
    }

    public static class RedemptionRequest {
        private String code;
        private Long bookingId;

        public String getCode() {
            return code;
        }

        public Long getBookingId() {
            return bookingId;
        }
    }
}
