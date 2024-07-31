package humber.ds.toursite.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.repository.CouponRepository;
import humber.ds.toursite.service.CouponService;
import humber.ds.toursite.service.PaymentService;

@Service
public class CouponServiceImp implements CouponService {
    CouponRepository couponRepository;
    PaymentService paymentService;

    @Autowired
    public CouponServiceImp(CouponRepository couponRepository, PaymentService paymentService) {
        this.couponRepository = couponRepository;
        this.paymentService = paymentService;
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
    public Coupon redeem(String code, Long paymentId) {
        List<Coupon> coupons = couponRepository.findByCode(code);
        Coupon coupon = coupons.size() > 0 ? coupons.get(0) : null;

        if (coupon == null || coupon.isRedeemed())
            throw new RuntimeException("Coupon is either invalid or has already been redeemed.");

        coupon.setRedeemed(true);
        paymentService.applyPromotions(paymentId, coupon);
        return coupon;
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
        private Long paymentId;

        public String getCode() {
            return code;
        }

        public Long getPaymentId() {
            return paymentId;
        }
    }
}
