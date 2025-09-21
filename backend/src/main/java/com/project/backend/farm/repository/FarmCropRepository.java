package com.project.backend.farm.repository;

import com.project.backend.farm.domain.FarmCrop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FarmCropRepository extends JpaRepository<FarmCrop, Long> {
    @Query("SELECT f FROM FarmCrop f WHERE f.farm.farmId = :farm_id AND f.isDeleted = false")
    List<FarmCrop> findFarmCropsByFarmIdAndIsDeleted(@Param("farm_id") Long farmId);

    @Query("SELECT f FROM FarmCrop f " +
            "WHERE f.farm.farmId = :farm_id " +
            "AND f.cropVariety.cropVarietyId = :crop_id " +
            "AND f.isDeleted = false")
    FarmCrop findFarmCropByFarmIdAndCropIdAndIsDeleted(@Param("farm_id") Long farmId, @Param("crop_id") Long cropId);
}
