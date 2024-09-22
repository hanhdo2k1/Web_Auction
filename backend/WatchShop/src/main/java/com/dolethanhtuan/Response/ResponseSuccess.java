package com.dolethanhtuan.Response;

import com.dolethanhtuan.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ResponseSuccess<T> implements Serializable {
    private int status;
    private String message;
    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    private T data;
    public ResponseSuccess(int status, String message) {
        this.status = status;
        this.message = message;
    }
    public ResponseSuccess(int status, String message,T t) {
        this.status = status;
        this.message = message;
        this.data = t;
    }
}
