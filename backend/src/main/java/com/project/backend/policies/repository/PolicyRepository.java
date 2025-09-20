package com.project.backend.policies.repository;

import com.project.backend.crops.domain.CropCategory;
import com.project.backend.policies.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Query("SELECT p FROM Policy p WHERE p.policyId = :policy_id")
    Policy findPolicyByPolicyId(@Param("policy_id") Long id);
}
