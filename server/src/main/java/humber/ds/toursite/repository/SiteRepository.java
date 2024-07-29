package humber.ds.toursite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import humber.ds.toursite.model.Site;

public interface SiteRepository extends JpaRepository<Site, Long> {

}
