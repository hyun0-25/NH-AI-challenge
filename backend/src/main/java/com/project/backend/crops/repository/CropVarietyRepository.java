package com.project.backend.crops.repository;

import com.project.backend.crops.domain.CropVariety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CropVarietyRepository extends JpaRepository<CropVariety, Long> {
    @Query("SELECT c FROM CropVariety c WHERE c.cropVarietyId = :crop_variety_id")
    CropVariety findByCropVarietyId(@Param("crop_variety_id") Long id);

}
