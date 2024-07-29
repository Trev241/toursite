package humber.ds.toursite.controller;

import java.util.List;

import humber.ds.toursite.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    SiteService siteService;

    @GetMapping("/sites")
    List<Site> all() {
        return siteService.getAll();
    }

    @PostMapping("/sites")
    Site newSite(@RequestBody Site newSite) {
        return siteService.saveSite(newSite);
    }

    @GetMapping("/sites/{id}")
    Site one(@PathVariable Long id) {
        return siteService.one(id);
    }

    @PutMapping("/sites/{id}")
    Site replaceSite(@RequestBody Site newSite, @PathVariable Long id) {
        return siteService.replaceSite(newSite, id);
    }

    @DeleteMapping("/sites/{id}")
    void deleteSite(@PathVariable Long id) {
        siteService.deleteSite(id);
    }
}
