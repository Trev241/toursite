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

import humber.ds.toursite.exceptions.SiteNotFoundException;
import humber.ds.toursite.model.Site;
import humber.ds.toursite.repository.SiteRepository;

@RestController
@RequestMapping("/api/v1")
public class SiteController {
    private final SiteRepository repository;

    SiteController(SiteRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/sites")
    List<Site> all() {
        return repository.findAll();
    }

    @PostMapping("/sites")
    Site newSite(@RequestBody Site newSite) {
        return repository.save(newSite);
    }

    @GetMapping("/sites/{id}")
    Site one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new SiteNotFoundException());
    }

    @PutMapping("/sites/{id}")
    Site replaceSite(@RequestBody Site newSite, @PathVariable Long id) {
        return repository.findById(id)
                .map(site -> {
                    site.setRate(newSite.getRate());
                    site.setStreet(newSite.getStreet());
                    site.setCity(newSite.getCity());
                    site.setZip(newSite.getZip());
                    site.setCountry(newSite.getCountry());
                    site.setPhone(newSite.getPhone());
                    site.setStatus(newSite.getStatus());

                    return site;
                }).orElseGet(() -> {
                    return repository.save(newSite);
                });
    }

    @DeleteMapping("/sites/{id}")
    void deleteSite(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
