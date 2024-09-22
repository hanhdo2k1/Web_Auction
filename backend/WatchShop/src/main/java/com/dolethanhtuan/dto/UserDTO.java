package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.VSDetail;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@JsonInclude( content = JsonInclude.Include.NON_NULL, value = JsonInclude.Include.NON_EMPTY)
public class UserDTO  implements Serializable {
    private Long id;
    private String username;
    @JsonIgnore
    private String password;
    private String fullname;
    private String email;
    private String phoneNumber;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date ngaySinh;
    private String roleCode;
    private Integer status;
    private Set<OrderDTO> orders = new HashSet<>();
    private CartDTO cart = new CartDTO();
    private Set<VSDetailDTO> VSDetails = new HashSet<>();

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
    @JsonIgnore
    public String getPassword() {
        return password;
    }
}
