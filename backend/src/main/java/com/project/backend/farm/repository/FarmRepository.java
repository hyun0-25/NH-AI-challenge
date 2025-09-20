package com.project.backend.farm.repository;

import com.project.backend.farm.domain.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FarmRepository extends JpaRepository<Farm, Long> {
    @Query("SELECT count(*) FROM Farm WHERE isDeleted = false")
    Integer countAllByIsDeletedIsFalse();
}
