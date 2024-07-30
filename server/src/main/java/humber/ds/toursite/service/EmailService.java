package humber.ds.toursite.service;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}
