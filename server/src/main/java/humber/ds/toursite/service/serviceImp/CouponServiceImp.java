package humber.ds.toursite.service.serviceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.repository.CouponRepository;
import humber.ds.toursite.service.CouponService;

@Service
public class CouponServiceImp implements CouponService {
    @Autowired
    CouponRepository couponRepository;

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
}
