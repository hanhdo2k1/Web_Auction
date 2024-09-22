package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findOneByUsernameAndPasswordAndStatus(String username,String password,int status);
    Optional<User> findOneByUsername(String username);
    User findOneByUserId(Long id);
}
