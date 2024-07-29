package humber.ds.toursite.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationService {
    @RequestMapping(value = "/status")
    public ResponseEntity<Object> getStatus() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
