package humber.ds.toursite.model;

import humber.ds.toursite.enums.BookingStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue
    private Long id;
    private Long site_id;
    private Long user_id;
    private Date booking_date;
    private Date check_in_date;
    private Date check_out_date;
    private BookingStatus status;
    private double total_price;

    public Booking(Long id, Long site_id, Long user_id, Date booking_date, Date check_in_date, Date check_out_date, BookingStatus status, double total_price) {
        this.id = id;
        this.site_id = site_id;
        this.user_id = user_id;
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

    public Long getSite_id() {
        return site_id;
    }

    public void setSite_id(Long site_id) {
        this.site_id = site_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Date getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(Date booking_date) {
        this.booking_date = booking_date;
    }

    public Date getCheck_in_date() {
        return check_in_date;
    }

    public void setCheck_in_date(Date check_in_date) {
        this.check_in_date = check_in_date;
    }

    public Date getCheck_out_date() {
        return check_out_date;
    }

    public void setCheck_out_date(Date check_out_date) {
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
