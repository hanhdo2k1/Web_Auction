package com.dolethanhtuan.service;

import com.dolethanhtuan.dto.ProductDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface IProductService extends IGenericService<ProductDTO> {
    ProductDTO save(ProductDTO productDTO, MultipartFile file) throws IOException;
    ProductDTO save2(ProductDTO productDTO, List<MultipartFile> file) throws IOException;
    List<ProductDTO> getListProductByPageNumber(int pageNum);
    List<ProductDTO> getListProduct(String txtSearch, Long category);
    void delete(List<Long> ids);
    void updateProductStatus();
    ProductDTO update(ProductDTO productDTO,List<MultipartFile> files) throws IOException;
}
