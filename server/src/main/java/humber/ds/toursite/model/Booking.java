package humber.ds.toursite.model;

import humber.ds.toursite.enums.BookingStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
public class Booking {
    @Id
    @GeneratedValue
    private Long id;
    private Long siteId;
    private Long clientId;
    private LocalDateTime booking_date;
    private LocalDate check_in_date;
    private LocalDate check_out_date;
    private BookingStatus status;
    private double total_price;

    public Booking() {}

    public Booking(Long id, Long siteId, Long clientId, LocalDateTime booking_date,
                   LocalDate check_in_date, LocalDate check_out_date, BookingStatus status, double total_price) {
        this.id = id;
        this.siteId = siteId;
        this.clientId = clientId;
        this.booking_date = booking_date;
        this.check_in_date = check_in_date;
        this.check_out_date = check_out_date;
        this.status = status;
        this.total_price = total_price;
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

    public LocalDateTime getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(LocalDateTime booking_date) {
        this.booking_date = booking_date;
    }

    public LocalDate getCheck_in_date() {
        return check_in_date;
    }

    public void setCheck_in_date(LocalDate check_in_date) {
        this.check_in_date = check_in_date;
    }

    public LocalDate getCheck_out_date() {
        return check_out_date;
    }

    public void setCheck_out_date(LocalDate check_out_date) {
        this.check_out_date = check_out_date;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }
}