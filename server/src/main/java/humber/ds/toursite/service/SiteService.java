package humber.ds.toursite.service;

import humber.ds.toursite.model.Site;

import java.util.List;

public interface SiteService {
    List<Site> getAll();

    Site saveSite(Site site);

    Site one(Long id);

    Site replaceSite(Site newSite, Long id);

    void deleteSite(Long id);
}
