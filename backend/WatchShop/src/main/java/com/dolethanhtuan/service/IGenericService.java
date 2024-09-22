package com.dolethanhtuan.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IGenericService<T> {
    T save(T t);
    void delete(Long[] ids);
    T update(T t);
    List<T> getAll();
    T getById(Long id);
}
