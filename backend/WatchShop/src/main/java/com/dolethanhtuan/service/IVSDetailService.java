package com.dolethanhtuan.service;

import com.dolethanhtuan.dto.VSDetailDTO;
import com.dolethanhtuan.entity.VSDetail;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IVSDetailService extends IGenericService<VSDetailDTO>{
    public VSDetailDTO save(VSDetailDTO vsDetailDTO, HttpSession session);
    public List<VSDetailDTO> findAllByProductId(Long productId);
    public List<VSDetailDTO> findAllByUsername(String username);
}
