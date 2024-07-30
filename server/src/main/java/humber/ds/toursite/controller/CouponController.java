package humber.ds.toursite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import humber.ds.toursite.model.Coupon;
import humber.ds.toursite.service.CouponService;

@RestController
@RequestMapping("/api/v1")
public class CouponController {
    @Autowired
    CouponService couponService;

    @GetMapping("/coupons")
    List<Coupon> all() {
        return couponService.getAll();
    }

    @PostMapping("/coupons/redeem")
    ResponseEntity<Object> redeem(@RequestBody Coupon details) {
        Coupon coupon = couponService.findByCode(details.getCode());
        HttpStatus status;

        if (coupon != null) {
            status = HttpStatus.OK;

            coupon.setRedeemed(true);
            couponService.saveCoupon(coupon);
        } else
            status = HttpStatus.BAD_REQUEST;

        // TODO: Link coupon to payment ID
        return new ResponseEntity<>(coupon, status);
    }

    @PostMapping("/coupons")
    Coupon newCoupon(@RequestBody Coupon newCoupon) {
        return couponService.saveCoupon(newCoupon);
    }

    @GetMapping("/coupons/{id}")
    Coupon one(@PathVariable Long id) {
        return couponService.one(id);
    }

    @PutMapping("/coupons/{id}")
    Coupon replaceCoupon(@RequestBody Coupon newCoupon, @PathVariable Long id) {
        return couponService.replaceCoupon(newCoupon, id);
    }

    @DeleteMapping("/coupons/{id}")
    void deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
    }
}
