package com.dolethanhtuan.utils.converter;

import com.dolethanhtuan.config.ModelMapperConfig;
import com.dolethanhtuan.dto.UserDTO;
import com.dolethanhtuan.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {
    @Autowired
    private ModelMapper modelMapper;
    public UserDTO toDTO(User userE){
        UserDTO userDTO = modelMapper.map(userE,UserDTO.class);
        return userDTO;
    }
    public User toEntity(UserDTO userD){
        User userE = modelMapper.map(userD, User.class);
        return userE;
    }
    public User toEntity(User userOld, UserDTO userDTO){
        if(userDTO.getFullname() != null)
            userOld.setFullname(userDTO.getFullname());
        if(userDTO.getEmail() != null)
            userOld.setEmail(userDTO.getEmail());
        if(userDTO.getPhoneNumber() != null)
            userOld.setPhoneNumber(userDTO.getPhoneNumber());
        if(userDTO.getNgaySinh() != null)
            userOld.setNgaySinh(userDTO.getNgaySinh());
        if(userDTO.getRoleCode() != null)
            userOld.setRoleCode(userDTO.getRoleCode());
        if(userDTO.getStatus() != null)
            userOld.setStatus(userDTO.getStatus());
        return userOld;
    }
}
