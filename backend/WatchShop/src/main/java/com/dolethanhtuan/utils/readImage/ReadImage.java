package com.dolethanhtuan.utils.readImage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class ReadImage {
    public static byte[] readImage(String path) throws IOException {
        return Files.readAllBytes(new File(path).toPath());
    }
}
