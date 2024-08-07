package humber.ds.toursite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import humber.ds.toursite.model.Client;
import org.springframework.data.jpa.repository.Query;;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByEmail(String email);

    @Query("SELECT email FROM Client WHERE role = 'user' ")
    List<String> findAllClientEmails();
}
