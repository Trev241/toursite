package humber.ds.toursite.service.serviceImp;

import humber.ds.toursite.exceptions.SiteNotFoundException;
import humber.ds.toursite.model.Site;
import humber.ds.toursite.repository.SiteRepository;
import humber.ds.toursite.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SiteServiceImp implements SiteService {
    @Autowired
    SiteRepository siteRepository;

    @Override
    public List<Site> getAll() {
        return siteRepository.findAll();
    }

    @Override
    public Site saveSite(Site site) {
        return siteRepository.save(site);
    }

    @Override
    public Site one(Long id) {
        return siteRepository.findById(id)
                .orElseThrow(() -> new SiteNotFoundException());
    }

    @Override
    public Site replaceSite(Site newSite, Long id) {
        return siteRepository.findById(id)
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
                    return siteRepository.save(newSite);
                });
    }

    @Override
    public void deleteSite(Long id) {
        siteRepository.deleteById(id);
    }
}
