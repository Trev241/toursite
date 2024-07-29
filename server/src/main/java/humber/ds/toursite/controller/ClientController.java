package humber.ds.toursite.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import humber.ds.toursite.model.Client;
import humber.ds.toursite.model.ClientNotFoundException;
import humber.ds.toursite.repository.ClientRepository;

@RestController
@RequestMapping("/api/v1")
public class ClientController {
    private final ClientRepository clientRepository;

    ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping("/clients")
    List<Client> all() {
        return clientRepository.findAll();
    }

    @PostMapping("/clients")
    Client newClient(@RequestBody Client newClient) {
        return clientRepository.save(newClient);
    }

    @GetMapping("/clients/{id}")
    Client one(@PathVariable Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException());
    }

    @PutMapping("/clients/{id}")
    Client replaceClient(@RequestBody Client newClient, @PathVariable Long id) {
        return clientRepository.findById(id).map(
                client -> {
                    client.setEmail(newClient.getEmail());
                    client.setUsername(newClient.getUsername());
                    client.setPassword(newClient.getPassword());
                    client.setAvatarUrl(newClient.getAvatarUrl());
                    client.setPhone(newClient.getPhone());
                    client.setAvatarUrl(newClient.getAvatarUrl());

                    return clientRepository.save(client);
                }).orElseGet(() -> {
                    return clientRepository.save(newClient);
                });
    }

    @DeleteMapping("/clients/{id}")
    void deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
    }
}
