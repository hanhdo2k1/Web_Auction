package com.dolethanhtuan.api;

import com.dolethanhtuan.utils.readImage.ReadImage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

@RestController
public class ImageAPI {
    private final String pathSaveFile = System.getProperty("user.dir")+"/src/main/resources/static/images";

    @GetMapping("image/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable("fileName") String path) throws IOException {
        byte[] file = ReadImage.readImage(pathSaveFile+"/product/"+path);
        MediaType fileType = null;
        if (path.endsWith(".png")) {
            fileType = MediaType.IMAGE_PNG;
        } else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
            fileType = MediaType.IMAGE_JPEG;
        } else if (path.endsWith(".gif")) {
            fileType = MediaType.IMAGE_GIF;
        }
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(fileType)
                .body(file);
    }
}
