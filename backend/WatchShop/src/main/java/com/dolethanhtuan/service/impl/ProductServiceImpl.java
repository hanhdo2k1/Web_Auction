package com.dolethanhtuan.service.impl;

import com.dolethanhtuan.dto.ProductDTO;
import com.dolethanhtuan.dto.VSDetailDTO;
import com.dolethanhtuan.entity.*;
import com.dolethanhtuan.entity.embeddedID.CartDetailId;
import com.dolethanhtuan.repository.*;
import com.dolethanhtuan.service.IProductService;
import com.dolethanhtuan.utils.converter.ProductConverter;
import com.dolethanhtuan.utils.converter.VSDetailConverter;
import com.dolethanhtuan.utils.readImage.ReadImage;
import org.apache.commons.io.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ProductServiceImpl implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductConverter productConverter;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private VSDetailConverter vsDetailConverter;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private VSDetailRepository vsDetailRepository;

    private final String pathSaveFile = System.getProperty("user.dir")+"/src/main/resources/static/images";
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductDTO save(ProductDTO productDTO, MultipartFile file) throws IOException {
        // Lưu ảnh
        String pathProduct =  "/product/"+file.getOriginalFilename();
        String filePath = pathSaveFile +pathProduct;
        file.transferTo(new File(filePath).toPath());
        productDTO.setThumbnail(pathProduct);

        // Chuyển sang entity để lưu db
        Product product = modelMapper.map(productDTO,Product.class);
        product.setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(null));
        product.setStatus(1);
        product = productRepository.save(product);

        // Chuyển sang dto để trả về
        productDTO = modelMapper.map(product,ProductDTO.class);
        productDTO.setCategoryId(product.getCategory().getId());
        return productDTO;
    }

    @Override
    public ProductDTO save2(ProductDTO productDTO, List<MultipartFile> files) throws IOException {
        if((productDTO.getStartDate().getTime() + 60000*60*24*3) <= (new Date()).getTime()){
            return null;
        }
        // Chuyển sang entity để lưu db
        Product product = modelMapper.map(productDTO,Product.class);
        product.setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(null));
        product.setStatus(1);
        product = productRepository.save(product);

        // Lưu ảnh
        int count = 1;
        for (MultipartFile file: files) {
            String pathProduct =  file.getOriginalFilename();
            String filePath = pathSaveFile+ "/product/"+pathProduct;
            file.transferTo(new File(filePath).toPath());
            if(count == 1){
                product.setThumbnail(pathProduct);
                count++;
            }
            imageRepository.save(Image.builder()
                    .imageName(file.getOriginalFilename())
                    .imagePath(filePath)
                    .product_image(product).build()
            );
        }
        product = productRepository.save(product);

        // Chuyển sang dto để trả về
        productDTO = modelMapper.map(product,ProductDTO.class);
        productDTO.setCategoryId(product.getCategory().getId());
        return productDTO;
    }
    @Override
    public ProductDTO update(ProductDTO productDTO, List<MultipartFile> files) throws IOException {
        Product productOld = productRepository.findById(productDTO.getId()).orElse(null);
        if(productOld == null){
            return null;
        }
        // Xóa ảnh cũ
        imageRepository.deleteAllByProductId(productOld.getId());
        productOld.setImages(new HashSet<>());
        // Lưu ảnh
        int count = 1;
        for (MultipartFile file: files) {
            String pathProduct =  file.getOriginalFilename();
            String filePath = pathSaveFile+ "/product/"+pathProduct;
            file.transferTo(new File(filePath).toPath());
            if(count == 1){
                productOld.setThumbnail(pathProduct);
                count++;
            }
            imageRepository.save(Image.builder()
                    .imageName(file.getOriginalFilename())
                    .imagePath(filePath)
                    .product_image(productOld).build()
            );
        }


        productOld = productRepository.save(productConverter.toEntity(productOld, productDTO));
        return modelMapper.map(productOld, ProductDTO.class);
    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        return null;
    }

    @Override
    public void delete(Long[] ids) {
        for (Long id: ids) {
            if(productRepository.findById(id).orElseThrow(null) != null)
                productRepository.deleteById(id);
        }
    }
    @Override
    public void delete(List<Long> ids) {
        for (var id : ids){
            imageRepository.deleteAllByProductId(id);
        }
        productRepository.deleteAllById(ids);
    }
    @Override
    public ProductDTO update(ProductDTO productDTO) {
        Product productOld = productRepository.findById(productDTO.getId()).orElseThrow(null);
        if(productOld == null){
            return null;
        }
        productOld = productRepository.save(productConverter.toEntity(productOld, productDTO));
        return modelMapper.map(productOld, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> getAll() {
        return productRepository.findAll().stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(null);
        if(product == null)
            return null;
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setVSDetails(vsDetailConverter.toDTOList(product.getVSDetails()));
        return productDTO ;
    }

    @Override
    public List<ProductDTO> getListProductByPageNumber(int pageNum) {
        int pageSize = 6;
        PageRequest pageable = PageRequest.of(pageNum, pageSize);
        List<Product> products = productRepository.findAll(pageable).getContent();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getListProduct(String txtSearch, Long category) {
        List<Product> products = productRepository.findAll().stream().filter(product -> product.getStatus() == 1).collect(Collectors.toList());
        if(txtSearch != null){
            products = products.stream()
                    .filter(product -> product.getProductName().contains(txtSearch) || product.getDescription().contains(txtSearch))
                    .collect(Collectors.toList());
        }
        if(category != null){
            products = products.stream()
                    .filter(product -> product.getCategory().getId() == category).collect(Collectors.toList());
        }
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    @Scheduled(fixedRate = 60000) // Lập lịch chạy mỗi phút (60000 milliseconds = 1 phut)
    @Async
    public void updateProductStatus() {
        List<Product> products = productRepository.findExpiredProductIds();
        productRepository.updateExpiredProducts();
        for (Product pro: products) {
            // Tìm user đấu giá trúng
            Set<VSDetail> vsDetails = pro.getVSDetails();
            if(vsDetails.stream().count() == 0)
                continue;
            List<VSDetail> sortedList = vsDetails.stream().map(vs -> vs)
                    .sorted(Comparator.comparing(VSDetail::getPrice,Comparator.reverseOrder()))
                    .toList();
            VSDetail vsDetail = sortedList.get(0);
            if(vsDetail != null){
                Long user_id = vsDetailRepository.findIdUserByIdVSDetail(vsDetail.getId());
                User user = userRepository.findOneByUserId(user_id);
                Cart cart = user.getCart();
                cart.setTotalPrice(cart.getTotalPrice()+vsDetail.getPrice());
                cartRepository.save(cart);
                cartDetailRepository.save(
                        CartDetail.builder()
                                .cartDetailId(new CartDetailId(cart.getCartId(), vsDetail.getProduct().getId()))
                                .product(vsDetail.getProduct())
                                .price(vsDetail.getPrice())
                                .cart(cart)
                                .build()
                );
            }
        }
    }



}
