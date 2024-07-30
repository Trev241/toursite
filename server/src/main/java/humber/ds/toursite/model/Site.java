package humber.ds.toursite.model;

import humber.ds.toursite.enums.SiteStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Site {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double rate;
    private String street;
    private String city;
    private String zip;
    private String country;
    private String phone;
    private SiteStatus status;
    private double price;
    private String description;

    Site() {
        this.status = SiteStatus.AVAILABLE;
    }

    Site(double rate, String street, String city, String zip, String country, String phone, SiteStatus status, double price, String description) {
        this.rate = rate;
        this.street = street;
        this.city = city;
        this.zip = zip;
        this.country = country;
        this.phone = phone;
        this.status = status;
        this.price = price;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public double getRate() {
        return rate;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getZip() {
        return zip;
    }

    public String getCountry() {
        return country;
    }

    public String getPhone() {
        return phone;
    }

    public SiteStatus getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setStatus(SiteStatus status) {
        this.status = status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
