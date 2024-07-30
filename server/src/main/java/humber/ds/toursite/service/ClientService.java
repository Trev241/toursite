package humber.ds.toursite.service;

import humber.ds.toursite.model.Client;

import java.util.List;

public interface ClientService {
    List<Client> getAll();

    Client saveClient(Client client);

    List<Client> findByEmail(String email);

    Client one(Long id);

    Client replaceClient(Client client, Long id);

    void deleteClient(Long id);
}
