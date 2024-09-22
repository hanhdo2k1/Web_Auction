package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.entity.VSDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface VSDetailRepository extends JpaRepository<VSDetail,Long> {
    Optional<List<VSDetail>> findAllByProduct(Product product);
    @Query(value = "SELECT user_user_id FROM vs_detail WHERE id = :idvsDetail", nativeQuery = true)
    Long findIdUserByIdVSDetail(Long idvsDetail);
    Set<VSDetail> findAllByUserUsername(String username);
}
