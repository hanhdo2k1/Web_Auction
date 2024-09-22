package com.dolethanhtuan.service.impl;

import com.dolethanhtuan.dto.UserDTO;
import com.dolethanhtuan.dto.VSDetailDTO;
import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.entity.VSDetail;
import com.dolethanhtuan.repository.ProductRepository;
import com.dolethanhtuan.repository.UserRepository;
import com.dolethanhtuan.repository.VSDetailRepository;
import com.dolethanhtuan.service.IVSDetailService;
import com.dolethanhtuan.utils.converter.VSDetailConverter;
import jakarta.servlet.http.HttpSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class VSDetailServiceImpl implements IVSDetailService {
    @Autowired
    private VSDetailRepository vsDetailRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private VSDetailConverter vsDetailConverter;

    @Override
    public VSDetailDTO save(VSDetailDTO vsDetailDTO) {
        return null;
    }

    @Override
    public void delete(Long[] ids) {

    }

    @Override
    public VSDetailDTO update(VSDetailDTO vsDetailDTO) {
        return null;
    }

    @Override
    public List<VSDetailDTO> getAll() {
        return null;
    }

    @Override
    public VSDetailDTO getById(Long id) {
        return null;
    }

    @Override
    public VSDetailDTO save(VSDetailDTO vsDetailDTO, HttpSession session) {
//        UserDTO user = (UserDTO) session.getAttribute("user");
//        if(user == null){
//            return null;
//        }
        Product product = productRepository.findOneByIdAndStatus(vsDetailDTO.getProductId(), 1);
        if(product == null) return null;
        List<Double> prices = product.getVSDetails().stream().map(vs -> vs.getPrice()).collect(Collectors.toList());
        for (Double price: prices) {
            if(price > vsDetailDTO.getPrice())
                return null;
        }
        vsDetailDTO.setId(null);
        vsDetailDTO.setVSDate(new Date());
        VSDetail vsDetail = vsDetailConverter.toEntity(vsDetailDTO);
        vsDetailRepository.save(vsDetail);

        vsDetailDTO = vsDetailConverter.toDTO(vsDetail);
        return vsDetailDTO;
    }

    @Override
    public List<VSDetailDTO> findAllByProductId(Long productId) {
        List<VSDetail> vsDetails = vsDetailRepository.findAllByProduct(Product.builder().id(productId).build()).orElseThrow(null);
        return vsDetails.stream()
                .map(vsDetail -> vsDetailConverter.toDTO(vsDetail))
                .collect(Collectors.toList());
    }

    @Override
    public List<VSDetailDTO> findAllByUsername(String username) {
        Set<VSDetail> vsDetails = vsDetailRepository.findAllByUserUsername(username);
        return vsDetailConverter.toDTOList(vsDetails)
                .stream()
                .sorted(Comparator.comparing(VSDetailDTO::getVSDate).reversed())
                .toList();
    }
}
