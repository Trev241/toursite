package humber.ds.toursite.controller;

import java.util.List;

import humber.ds.toursite.service.ClientService;
import humber.ds.toursite.service.imp.ClientServiceImp.ClientCredentials;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    Client registerClient(@RequestBody Client newClient) {
        return clientService.register(newClient);
    }

    @PostMapping("/clients/signin")
    ResponseEntity<Client> signinClient(@RequestBody ClientCredentials clientCredentials) {
        Client client = clientService.signin(clientCredentials);
        HttpStatus status = client != null ? HttpStatus.OK : HttpStatus.FORBIDDEN;

        return new ResponseEntity<>(client, status);
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
