package com.project.backend.farm.repository;

import com.project.backend.farm.domain.FarmCrop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmCropRepository extends JpaRepository<FarmCrop, Long> {
}
