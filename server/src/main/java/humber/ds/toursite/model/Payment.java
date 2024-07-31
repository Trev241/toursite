package humber.ds.toursite.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import humber.ds.toursite.enums.PaymentStatus;
import humber.ds.toursite.enums.PaymentType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) // Handle lazy loading
public class Payment {
    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;
    private double total;
    private double discount;
    private double netTotal;
    private PaymentStatus status;
    private Date transactionTime;
    private PaymentType paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking.id")
    private Booking booking;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon.id")
    private List<Coupon> coupons;

    public Payment() {
        this.status = PaymentStatus.PENDING;
    }

    public Payment(double total, double discount, double netTotal, PaymentStatus status,
            Date transactionTime, PaymentType paymentType, Booking booking, List<Coupon> coupons) {
        this.total = total;
        this.discount = discount;
        this.netTotal = netTotal;
        this.status = status;
        this.transactionTime = transactionTime;
        this.paymentType = paymentType;
        this.booking = booking;
        this.coupons = coupons;
    }

    public Long getId() {
        return id;
    }

    public double getTotal() {
        return total;
    }

    public double getDiscount() {
        return discount;
    }

    public double getNetTotal() {
        return netTotal;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public Date getTransactionTime() {
        return transactionTime;
    }

    public Booking getBooking() {
        return booking;
    }

    public List<Coupon> getCoupons() {
        return coupons;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public void setNetTotal(double netTotal) {
        this.netTotal = netTotal;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public void setTransactionTime(Date transactionTime) {
        this.transactionTime = transactionTime;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
