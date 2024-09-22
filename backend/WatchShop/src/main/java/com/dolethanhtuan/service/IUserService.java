package com.dolethanhtuan.service;

import com.dolethanhtuan.Request.RequestSignup;
import com.dolethanhtuan.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IUserService extends IGenericService<UserDTO> {
    UserDTO signup(RequestSignup requestSignup);
    UserDTO signin(String username,String password);
    UserDTO findByUsername(String username);
    void delete(List<Long> ids);
    UserDTO update(UserDTO user);
    void updateStatus(String username);
}
