package humber.ds.toursite.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) // Handle lazy loading
public class Coupon {
    private @Id @GeneratedValue Long id;
    private String code;
    private boolean redeemed;
    private double discountRate;
    private double flatDiscount;

    Coupon() {
        this.code = Integer.toString(Objects.hash(this.id, System.currentTimeMillis()));
    }

    Coupon(boolean redeemed, double discountRate, double flatDiscount) {
        this.redeemed = redeemed;
        this.discountRate = discountRate;
        this.flatDiscount = flatDiscount;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public boolean isRedeemed() {
        return redeemed;
    }

    public double getDiscountRate() {
        return discountRate;
    }

    public double getFlatDiscount() {
        return flatDiscount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setRedeemed(boolean redeemed) {
        this.redeemed = redeemed;
    }

    public void setDiscountRate(double discountRate) {
        this.discountRate = discountRate;
    }

    public void setFlatDiscount(double flatDiscount) {
        this.flatDiscount = flatDiscount;
    }
}
