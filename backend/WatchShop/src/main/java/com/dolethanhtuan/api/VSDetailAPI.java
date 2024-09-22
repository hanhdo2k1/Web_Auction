package com.dolethanhtuan.api;

import com.dolethanhtuan.Response.ResponseSuccess;
import com.dolethanhtuan.dto.VSDetailDTO;
import com.dolethanhtuan.service.IVSDetailService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("vsdetail/")
public class VSDetailAPI {
    @Autowired
    private IVSDetailService vsDetailService;

    @PostMapping("product")
    public ResponseSuccess<?> DauGia(HttpSession session, @RequestBody VSDetailDTO vsDetailDTO){
        VSDetailDTO rs = vsDetailService.save(vsDetailDTO, session);
        if(rs == null){
            return new ResponseSuccess<>(HttpStatus.LOCKED.value(), "Có người đã đấu giá lớn hơn giá của bạn đưa ra");
        }
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Đấu giá thành công",rs);
    }
    @PostMapping("/user")
    public ResponseSuccess<?> getVSDetailByUsername(@RequestBody Map<String,String> data){
        String username = data.get("username");
        return new ResponseSuccess<>(HttpStatus.OK.value(), "Get vsdetail success",vsDetailService.findAllByUsername(username));
    }
}
