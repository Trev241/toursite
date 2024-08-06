package humber.ds.toursite.service.imp;

import humber.ds.toursite.enums.BookingStatus;
import humber.ds.toursite.model.Booking;
import humber.ds.toursite.model.Client;
import humber.ds.toursite.repository.BookingRepository;
import humber.ds.toursite.repository.ClientRepository;
import humber.ds.toursite.service.EmailService;
import humber.ds.toursite.service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SchedulerServiceImp implements SchedulerService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 0 * * ?")
    @Override
    public void updateBookingStatus() {
        LocalDate now = LocalDate.now();
        List<Booking> bookings = bookingRepository.findByStatusAndPaymentCompletedFalse(BookingStatus.PROCESSING);
        Map<Long, Client> notifiedClients = new HashMap<>();

        for (Booking booking : bookings) {
            System.out.println(now + "--" + booking.getPaymentDeadline().minusDays(1));
            if (now.isAfter(booking.getPaymentDeadline())) {
                booking.setStatus(BookingStatus.CANCELLED);
                bookingRepository.save(booking);
            } else if (now.isEqual(booking.getPaymentDeadline().minusDays(1))
                        && !notifiedClients.containsKey(booking.getClientId())) {

                Client client = clientRepository.findById(booking.getClientId()).orElseThrow();
                notifiedClients.put(booking.getClientId(), client);

                emailService.sendEmail(client.getEmail(),
                        "Payment Reminder",
                          "Please complete your payment by " + booking.getPaymentDeadline().toString());
            }
        }
    }


}
