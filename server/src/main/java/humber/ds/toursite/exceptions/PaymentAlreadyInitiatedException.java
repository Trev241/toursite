package humber.ds.toursite.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Payment already initiated")
public class PaymentAlreadyInitiatedException extends RuntimeException {

}
