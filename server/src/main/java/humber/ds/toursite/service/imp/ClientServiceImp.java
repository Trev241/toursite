package humber.ds.toursite.service.imp;

import humber.ds.toursite.model.Client;
import humber.ds.toursite.exceptions.ClientNotFoundException;
import humber.ds.toursite.exceptions.UsedEmailException;
import humber.ds.toursite.repository.ClientRepository;
import humber.ds.toursite.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImp implements ClientService {
    @Autowired
    ClientRepository clientRepository;

    @Override
    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    @Override
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client register(Client client) {
        List<Client> clientsWithEmail = clientRepository.findByEmail(client.getEmail());

        if (!clientsWithEmail.isEmpty())
            throw new UsedEmailException();

        client.setRole("user");
        return clientRepository.save(client);
    }

    @Override
    public Client signin(ClientCredentials clientCredentials) {
        List<Client> clientsWithEmail = clientRepository.findByEmail(clientCredentials.getEmail());
        if (clientsWithEmail.isEmpty())
            throw new RuntimeException("Client with given email does not exist");

        Client client = clientsWithEmail.get(0);
        return (client.getPassword().equals(clientCredentials.getPassword()))
                ? client
                : null;
    }

    @Override
    public List<Client> findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    @Override
    public Client one(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException());
    }

    @Override
    public Client replaceClient(Client newClient, Long id) {
        return clientRepository.findById(id).map(
                client -> {
                    client.setEmail(newClient.getEmail());
                    client.setUsername(newClient.getUsername());
                    client.setFirstName(newClient.getFirstName());
                    client.setLastName(newClient.getLastName());
                    client.setPassword(newClient.getPassword());
                    client.setAvatarUrl(newClient.getAvatarUrl());
                    client.setPhone(newClient.getPhone());
                    client.setAvatarUrl(newClient.getAvatarUrl());

                    return clientRepository.save(client);
                }).orElseGet(() -> {
                    return clientRepository.save(newClient);
                });
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    public static class ClientCredentials {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public String getPassword() {
            return password;
        }
    }
}
