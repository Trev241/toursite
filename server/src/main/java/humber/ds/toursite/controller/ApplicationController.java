package humber.ds.toursite.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ApplicationController {
    @GetMapping("/trenohar")
    public ResponseEntity<Object> getStatus() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
