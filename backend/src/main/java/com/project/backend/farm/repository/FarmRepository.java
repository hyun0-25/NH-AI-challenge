package com.project.backend.farm.repository;

import com.project.backend.farm.domain.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmRepository extends JpaRepository<Farm, Long> {
}
