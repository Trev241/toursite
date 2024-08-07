package humber.ds.toursite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import humber.ds.toursite.model.Client;;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByEmail(String email);
}
