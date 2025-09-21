package com.project.backend.insurances.respository;

import com.project.backend.insurances.domain.Insurance;
import com.project.backend.policies.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InsuranceRepository extends JpaRepository<Insurance, Long> {

    @Query("SELECT i FROM Insurance i WHERE i.insuranceId = :insurance_id")
    Insurance findInsuranceByInsuranceId(@Param("insurance_id") Long id);
}
