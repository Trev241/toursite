package humber.ds.toursite.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import humber.ds.toursite.model.Photo;
import humber.ds.toursite.model.Site;
import humber.ds.toursite.repository.PhotoRepository;
import humber.ds.toursite.repository.SiteRepository;
import humber.ds.toursite.service.PhotoService;

@Service
public class PhotoServiceImp implements PhotoService {
    private final PhotoRepository photoRepository;
    private final SiteRepository siteRepository;

    @Autowired
    public PhotoServiceImp(PhotoRepository photoRepository, SiteRepository siteRepository) {
        this.photoRepository = photoRepository;
        this.siteRepository = siteRepository;
    }

    @Override
    public List<Photo> getAll() {
        return photoRepository.findAll();
    }

    @Override
    public Photo one(Long id) {
        return photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Photo does not exist"));
    }

    @Override
    public Photo savePhoto(@RequestBody PhotoRequest photoRequest) {
        Photo photo = new Photo(photoRequest.getUrl());
        Site site = siteRepository.findById(photoRequest.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site does not exist"));

        // Add photo to site
        Photo savedPhoto = photoRepository.save(photo);
        site.getPhotos().add(savedPhoto);
        siteRepository.save(site);

        return savedPhoto;
    }

    @Override
    public void deletePhoto(Long id) {
        photoRepository.deleteById(id);
    }

    public static class PhotoRequest {
        private Long id;
        private String url;
        private Long siteId;

        public Long getId() {
            return id;
        }

        public String getUrl() {
            return url;
        }

        public Long getSiteId() {
            return siteId;
        }
    }
}
