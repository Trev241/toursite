package humber.ds.toursite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import humber.ds.toursite.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

}
