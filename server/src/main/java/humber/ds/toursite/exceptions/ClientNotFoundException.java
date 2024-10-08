package humber.ds.toursite.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such Client")
public class ClientNotFoundException extends RuntimeException {

}
