package com.project.backend.farm.repository;

import com.project.backend.farm.domain.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FarmRepository extends JpaRepository<Farm, Long> {
    @Query("SELECT count(*) FROM Farm WHERE isDeleted = false")
    Integer countAllByIsDeleted();

    @Query("SELECT f FROM Farm f WHERE f.farmId = :farm_id AND f.isDeleted = false")
    Farm findByFarmIdAndIsDeleted(@Param("farm_id") Long farmId);
}
