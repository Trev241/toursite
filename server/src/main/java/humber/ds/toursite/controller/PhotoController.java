package humber.ds.toursite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import humber.ds.toursite.model.Photo;
import humber.ds.toursite.service.PhotoService;
import humber.ds.toursite.service.imp.PhotoServiceImp.PhotoRequest;

@RestController
@RequestMapping("/api/v1")
public class PhotoController {
    @Autowired
    PhotoService photoService;

    @GetMapping("/photos")
    List<Photo> all() {
        return photoService.getAll();
    }

    @PostMapping("/photos")
    Photo newPhoto(@RequestBody PhotoRequest photoRequest) {
        return photoService.savePhoto(photoRequest);
    }

    @GetMapping("/photos/{id}")
    Photo one(@PathVariable Long id) {
        return photoService.one(id);
    }

    @DeleteMapping("/photos/{id}")
    void deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
    }
}
