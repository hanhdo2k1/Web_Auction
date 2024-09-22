package com.dolethanhtuan.service.impl;

import com.dolethanhtuan.dto.CartDTO;
import com.dolethanhtuan.dto.CartDetailDTO;
import com.dolethanhtuan.dto.UserDTO;
import com.dolethanhtuan.entity.Cart;
import com.dolethanhtuan.entity.CartDetail;
import com.dolethanhtuan.entity.User;
import com.dolethanhtuan.repository.CartDetailRepository;
import com.dolethanhtuan.repository.CartRepository;
import com.dolethanhtuan.repository.UserRepository;
import com.dolethanhtuan.service.ICartService;
import com.dolethanhtuan.utils.converter.UserConverter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
@Component
public class CartServiceImpl implements ICartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CartDTO save(CartDTO cartDTO) {
        return null;
    }

    @Override
    public void delete(Long[] ids) {

    }

    @Override
    public CartDTO update(CartDTO cartDTO) {
        return null;
    }

    @Override
    public List<CartDTO> getAll() {
        return null;
    }

    @Override
    public CartDTO getById(Long id) {
        return null;
    }


    @Override
    public CartDTO findCartByUsername(String username) {
        User user = userRepository.findOneByUsername(username).orElse(null);
        UserDTO userDTO = userConverter.toDTO(user);
        return userDTO.getCart();
    }

    @Transactional
    @Override
    public void resetCartById(Long idCart) {
        Cart cartOld = cartRepository.findById(idCart).orElse(null);
        if (cartOld == null) return;
        cartOld.setTotalPrice(0.0);

        cartDetailRepository.deleteAllByCartId(cartOld.getCartId());

        cartOld.setCartDetails(new HashSet<>());

        // Sử dụng merge thay vì save
        cartRepository.saveAndFlush(cartOld);
    }


}
