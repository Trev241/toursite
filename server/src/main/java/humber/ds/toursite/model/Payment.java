package humber.ds.toursite.model;

import java.time.LocalDate;
import java.util.Date;

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

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) // Handle lazy loading
public class Payment {
    private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;
    private double amount;
    private PaymentStatus status;
    private Date transactionTime;
    private LocalDate requiredBy;
    private PaymentType paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking.id")
    private Booking booking;

    public Payment() {
        this.status = PaymentStatus.PENDING;
    }

    public Payment(double amount, PaymentStatus status,
            Date transactionTime, LocalDate requiredBy, PaymentType paymentType, Booking booking) {
        this.amount = amount;
        this.status = status;
        this.transactionTime = transactionTime;
        this.paymentType = paymentType;
        this.booking = booking;
        this.requiredBy = requiredBy;
    }

    public Long getId() {
        return id;
    }

    public double getAmount() {
        return amount;
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

    public LocalDate getRequiredBy() {
        return requiredBy;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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

    public void setRequiredBy(LocalDate requiredBy) {
        this.requiredBy = requiredBy;
    }
}
