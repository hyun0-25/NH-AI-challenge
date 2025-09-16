package com.project.backend.crops.repository;

import com.project.backend.crops.domain.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CropRepository extends JpaRepository<CropCategory, Long> {
    @Query("SELECT DISTINCT c FROM CropCategory c LEFT JOIN FETCH c.cropVarieties")
    List<CropCategory> findAllWithVarieties();
}
