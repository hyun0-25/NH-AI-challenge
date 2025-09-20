package com.project.backend.finance.repository;

import com.project.backend.finance.domain.Finance;
import com.project.backend.policies.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Finance, Long> {
    @Query("SELECT f FROM Finance f WHERE f.financeId = :fiance_id")
    Finance findFinanceByFinanceId(@Param("fiance_id") Long id);
}
