package humber.ds.toursite.controller;

import java.util.List;

import humber.ds.toursite.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import humber.ds.toursite.model.Client;

@RestController
@RequestMapping("/api/v1")
public class ClientController {
    @Autowired
    ClientService clientService;

    @GetMapping("/clients")
    List<Client> all() {
        return clientService.getAll();
    }

    @PostMapping("/clients")
    Client newClient(@RequestBody Client newClient) {
        return clientService.saveClient(newClient);
    }

    @PostMapping("/clients/register")
    ResponseEntity<Client> registerClient(@RequestBody Client newClient) {
        HttpStatus status;
        if (clientService.findByEmail(newClient.getEmail()).size() > 0) {
            status = HttpStatus.BAD_REQUEST;
        } else {
            status = HttpStatus.OK;
            clientService.saveClient(newClient);
        }

        return new ResponseEntity<>(newClient, status);
    }

    @PostMapping("/clients/signin")
    ResponseEntity<Client> signinClient(@RequestBody Client credentials) {
        Client client = clientService.findByEmail(credentials.getEmail()).get(0);
        HttpStatus status = (client != null && client.getPassword().equals(credentials.getPassword()))
                ? HttpStatus.OK
                : HttpStatus.FORBIDDEN;

        return new ResponseEntity<>(status);
    }

    @GetMapping("/clients/{id}")
    Client one(@PathVariable Long id) {
        return clientService.one(id);
    }

    @PutMapping("/clients/{id}")
    Client replaceClient(@RequestBody Client newClient, @PathVariable Long id) {
        return clientService.replaceClient(newClient, id);
    }

    @DeleteMapping("/clients/{id}")
    void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}
