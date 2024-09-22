package com.dolethanhtuan.api;

import com.dolethanhtuan.dto.ProductDTO;
import com.dolethanhtuan.dto.VSDetailDTO;
import com.dolethanhtuan.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("product/")
public class ProductAPI {
    @Autowired
    private IProductService productService;
    @Autowired
    private ImageAPI imageAPI;
    // Người dùng
    @GetMapping("/all")
    public List<ProductDTO> getAllProduct(@RequestParam(defaultValue = "0",required = false,name = "category") Long category, @RequestParam(required = false,name = "txtSearch") String txtSearch) throws IOException {
        if(category == 0)
            category = null;
        return productService.getListProduct(txtSearch,category);
    }
    @GetMapping("/admin/all")
    public List<ProductDTO> getAllProductAdmin() throws IOException {
        return productService.getAll();
    }
    @GetMapping("/detail/{id}")
    public ProductDTO getDetailProduct(@PathVariable("id") Long id) throws IOException {
        if(id == null)
            return null;
        ProductDTO productDTO = productService.getById(id);
        List<VSDetailDTO> sortedList = productDTO.getVSDetails().stream()
                .sorted(Comparator.comparing(VSDetailDTO::getPrice).reversed())
                .toList();
        Set<VSDetailDTO> sortedSet = new LinkedHashSet<>(sortedList);
        productDTO.setVSDetails(sortedSet);
        return productDTO;
    }

    // Quản lý sản phẩm
    @PostMapping("admin/save")
    public ProductDTO saveProduct(@RequestParam("files") List<MultipartFile> files, @ModelAttribute ProductDTO productDTO) throws IOException {
        return productService.save2(productDTO, files);
    }
    @PutMapping("admin/update")
    public ProductDTO updateProduct(@ModelAttribute ProductDTO productDTO,@RequestParam(value = "files",required = false) List<MultipartFile> files) throws IOException {
        if(files == null)
            return productService.update(productDTO);
        else
            return productService.update(productDTO,files);
    }
    @DeleteMapping("admin/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id){
        List<Long> ids = new ArrayList<>();
        ids.add(id);
        productService.delete(ids);
    }
    @GetMapping("/countEnded")
    public long countProductEnd(){
        return productService.getAll().stream().filter(productDTO -> productDTO.getStatus() == 0).count();
    }
    @GetMapping("/countExist")
    public long countProductExist(){
        return productService.getAll().stream().filter(productDTO -> productDTO.getStatus() == 1).count();
    }

}
