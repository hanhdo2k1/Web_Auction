package com.dolethanhtuan.service.impl;

import com.dolethanhtuan.Request.RequestSignup;
import com.dolethanhtuan.dto.UserDTO;
import com.dolethanhtuan.entity.Cart;
import com.dolethanhtuan.entity.User;
import com.dolethanhtuan.repository.CartRepository;
import com.dolethanhtuan.repository.UserRepository;
import com.dolethanhtuan.service.IUserService;
import com.dolethanhtuan.utils.converter.UserConverter;
import com.dolethanhtuan.utils.encode;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private encode passwordEncode;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CartRepository cartRepository;

    @Override
    public UserDTO signup(RequestSignup requestSignup) {
        User userE = userRepository.findOneByUsername(requestSignup.getUsername()).orElse(null);
        if(userE == null){
            userE = modelMapper.map(requestSignup, User.class);
            userE.setRoleCode("ROLE_USER");
            userE.setPassword(passwordEncode.hashPassword(userE.getPassword()));
            userE.setStatus(1);
            userE = userRepository.save(userE);
            Cart cart = Cart.builder().totalPrice(0.0).status(1).user(userE).build();
            cartRepository.save(cart);
            return userConverter.toDTO(userE);
        }
        return null;
    }

    @Override
    public UserDTO signin(String username, String password) {
        User userE = userRepository.findOneByUsernameAndPasswordAndStatus(username,passwordEncode.hashPassword(password),1).orElse(null);
        if(userE == null)
            return null;
        return userConverter.toDTO(userE);
    }

    @Override
    public UserDTO findByUsername(String username) {
        User userE = userRepository.findOneByUsername(username).orElse(null);
        if(userE == null)
            return null;
        return userConverter.toDTO(userE);
    }

    @Override
    public void delete(List<Long> ids) {
        userRepository.deleteAllById(ids);
    }

    @Override
    public UserDTO save(UserDTO userDTO) {
        if(userRepository.findOneByUsername(userDTO.getUsername()).orElse(null) != null) return null;
        User user = userConverter.toEntity(userDTO);
        user.setPassword(passwordEncode.hashPassword(userDTO.getPassword()));
        user.setUserId(null);
        user.setCart(null);
        user = userRepository.save(user);
        Cart cart = Cart.builder().totalPrice(0.0).status(1).user(user).build();
        cartRepository.save(cart);
        return userConverter.toDTO(user);
    }

    @Override
    public void delete(Long[] ids) {

    }

    @Override
    public UserDTO update(UserDTO userDTO) {
        User userOld = userRepository.findOneByUsername(userDTO.getUsername()).orElse(null);
        if(userOld == null) return null;
        userOld = userConverter.toEntity(userOld,userDTO);
        userOld = userRepository.save(userOld);
        return userConverter.toDTO(userOld);
    }

    @Override
    public List<UserDTO> getAll() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user: users) {
            UserDTO userDTO = userConverter.toDTO(user);
            userDTOS.add(userDTO);
        }
        return userDTOS;
    }

    @Override
    public UserDTO getById(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return userConverter.toDTO(user);
    }

    @Override
    public void updateStatus(String username) {
        User userE = userRepository.findOneByUsername(username).orElse(null);
        if(userE != null){
            int status = userE.getStatus() == 0 ? 1 : 0;
            userE.setStatus(status);
            userRepository.save(userE);
        }
    }
}
