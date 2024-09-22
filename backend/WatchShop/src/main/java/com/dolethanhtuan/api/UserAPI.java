package com.dolethanhtuan.api;

import com.dolethanhtuan.Request.RequestSignin;
import com.dolethanhtuan.Request.RequestSignup;
import com.dolethanhtuan.Response.ResponseSuccess;
import com.dolethanhtuan.dto.UserDTO;
import com.dolethanhtuan.service.IUserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user/")
public class UserAPI {
    @Autowired
    private IUserService userService;

    // Authen và Author

    @PostMapping(value = "signin")
    public ResponseSuccess<?> signin(@RequestBody RequestSignin requestSignin, HttpSession session){
        UserDTO user = userService.signin(requestSignin.getUsername(),requestSignin.getPassword());
        if(user == null)
            return new ResponseSuccess<>(HttpStatus.NOT_FOUND.value(), "Username or password invalid");
        session.setAttribute("user",user);
//        user = user.
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Login success",user);
    }
    @PostMapping("signup")
    public ResponseSuccess<?> signup(@RequestBody RequestSignup requestSignup){
        UserDTO user = userService.signup(requestSignup);
        if(user == null)
            return new ResponseSuccess<>(HttpStatus.BAD_REQUEST.value(), "User existed");
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Register success",user);
    }

    @GetMapping("auth/logout")
    public ResponseSuccess<?> logout(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return new ResponseSuccess<>(HttpStatus.BAD_REQUEST.value(), "Before you must login");
        }
        session.removeAttribute("user");
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Logout successful");
    }

    // Quản lý tài khoản
    @GetMapping("admin/all")
    public ResponseSuccess<?> getAll(HttpSession session){
        /*if (session.getAttribute("user") == null) {
            return new ResponseSuccess<>(HttpStatus.BAD_REQUEST.value(), "Before you must login");
        }*/
        return new ResponseSuccess<>(HttpStatus.OK.value(),"Get succesfully",userService.getAll()) ;
    }
    @GetMapping("admin/detail/{id}")
    public ResponseSuccess<?> detail(@PathVariable Long id,HttpSession session){
        return new ResponseSuccess<>(HttpStatus.OK.value(),"Success",userService.getById(id));
    }
    @PostMapping("admin/add")
    public ResponseSuccess<?> addUser(@RequestBody UserDTO userDTO,HttpSession session){
        if (session.getAttribute("user") == null) {
            return new ResponseSuccess<>(HttpStatus.BAD_REQUEST.value(), "Before you must login");
        }
        UserDTO user = userService.save(userDTO);
        if(user == null){
            return new ResponseSuccess<>(HttpStatus.BAD_REQUEST.value(), "Username existed");
        }
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Add user successfully",user);
    }
    @PutMapping("admin/update")
    public ResponseSuccess<?> updateUser(@RequestBody UserDTO userDTO,HttpSession session){
        UserDTO user = userService.update(userDTO);
        session.setAttribute("user", user);
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Update user successfully",user);
    }
    @DeleteMapping("admin/delete")
    public ResponseSuccess<?> deleteUser(@RequestBody Map<String,List<Long>> data){
        List<Long> ids = data.get("ids");
        userService.delete(ids);
        return new ResponseSuccess<>(HttpStatus.OK.value(),"Delete successfully");
    }
    @PatchMapping("auth/status")
    public ResponseSuccess<?> updateStatus(@RequestBody UserDTO userDTO){
        userService.updateStatus(userDTO.getUsername());
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Change status successful");
    }
    @GetMapping("count")
    public long countUser(){
        return userService.getAll().size();
    }

}
