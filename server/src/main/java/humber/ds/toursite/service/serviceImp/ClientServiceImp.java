package humber.ds.toursite.service.serviceImp;

import humber.ds.toursite.model.Client;
import humber.ds.toursite.exceptions.ClientNotFoundException;
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
}
