package humber.ds.toursite.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import humber.ds.toursite.enums.BookingStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long siteId;
    private Long clientId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime bookingDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate checkOutDate;
    private BookingStatus status;
    private double totalPrice;
    private double discount;
    private double netTotal;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDate paymentDeadline;
    private boolean paymentCompleted;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon.id")
    private List<Coupon> coupons;

    public Booking() {}

    public Booking(Long id, Long siteId, Long clientId, LocalDateTime bookingDate,
            LocalDate checkInDate, LocalDate checkOutDate, BookingStatus status, double totalPrice, double discount,
            double netTotal, LocalDate paymentDeadline, boolean paymentCompleted) {
        this.id = id;
        this.siteId = siteId;
        this.clientId = clientId;
        this.bookingDate = bookingDate;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.status = status;
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.netTotal = netTotal;
        this.paymentDeadline = paymentDeadline;
        this.paymentCompleted = paymentCompleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public double getDiscount() {
        return discount;
    }

    public double getNetTotal() {
        return netTotal;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public List<Coupon> getCoupons() {
        return coupons;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public void setNetTotal(double netTotal) {
        this.netTotal = netTotal;
    }

    public LocalDate getPaymentDeadline() {
        return paymentDeadline;
    }

    public void setPaymentDeadline(LocalDate paymentDeadline) {
        this.paymentDeadline = paymentDeadline;
    }

    public boolean isPaymentCompleted() {
        return paymentCompleted;
    }

    public void setPaymentCompleted(boolean paymentCompleted) {
        this.paymentCompleted = paymentCompleted;
    }
}