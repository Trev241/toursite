package humber.ds.toursite.service;

import humber.ds.toursite.model.Client;
import humber.ds.toursite.service.imp.ClientServiceImp.ClientCredentials;

import java.util.List;

public interface ClientService {
    List<Client> getAll();

    Client saveClient(Client client);

    List<Client> findByEmail(String email);

    Client register(Client client);

    Client signin(ClientCredentials clientCredentials);

    Client one(Long id);

    Client replaceClient(Client client, Long id);

    void deleteClient(Long id);
}
