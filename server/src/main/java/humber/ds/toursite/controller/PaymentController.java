package humber.ds.toursite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import humber.ds.toursite.model.Payment;
import humber.ds.toursite.service.PaymentService;
import humber.ds.toursite.service.imp.PaymentServiceImp.CheckoutRequest;
import humber.ds.toursite.service.imp.PaymentServiceImp.PaymentRequest;

@RestController
@RequestMapping("/api/v1")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @GetMapping("/payments")
    List<Payment> all() {
        return paymentService.getAll();
    }

    @GetMapping("/payments/{id}")
    Payment one(@PathVariable Long id) {
        return paymentService.one(id);
    }

    @PostMapping("/payments/initiate")
    Payment initiatePayment(@RequestBody PaymentRequest paymentRequest) {
        return paymentService.initiatePayment(paymentRequest);
    }

    @PostMapping("/payments/checkout")
    Payment checkout(@RequestBody CheckoutRequest checkoutRequest) {
        return paymentService.checkout(checkoutRequest.getPaymentId());
    }

    @PutMapping("/payments/{id}")
    Payment replacePayment(@RequestBody Payment newPayment, Long id) {
        return paymentService.replacePayment(newPayment, id);
    }

    @DeleteMapping("/payments/{id}")
    void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}
