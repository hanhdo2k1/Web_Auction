package com.dolethanhtuan.api;

import com.dolethanhtuan.Response.ResponseSuccess;
import com.dolethanhtuan.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("cart/")
public class CartAPI{
    @Autowired
    private ICartService cartService;
    @PostMapping("/user")
    public ResponseSuccess<?> findCartByUsername(@RequestBody Map<String,String> data){
        String username  = data.get("username");
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Get cart success",cartService.findCartByUsername(username));
    }
}
