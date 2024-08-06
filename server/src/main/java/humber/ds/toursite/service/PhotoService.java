package humber.ds.toursite.service;

import java.util.List;

import humber.ds.toursite.model.Photo;
import humber.ds.toursite.service.imp.PhotoServiceImp.PhotoRequest;

public interface PhotoService {
    List<Photo> getAll();

    Photo one(Long id);

    Photo savePhoto(PhotoRequest photoRequest);

    void deletePhoto(Long id);
}