package com.project.backend.insurances.controller;

import com.project.backend.insurances.dto.response.InsuranceRecommendResponseDto;
import com.project.backend.insurances.service.InsuranceService;
import com.project.backend.policies.dto.response.PolicyDetailResponseDto;
import com.project.backend.policies.dto.response.PolicyRecommendResponseDto;
import com.project.backend.policies.service.PolicyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/insurances")
public class InsuranceController {
    private final InsuranceService insuranceService;

    @GetMapping("/{farmId}/{cropId}")
    public ResponseEntity<InsuranceRecommendResponseDto> getInsuranceRecommend(
            @PathVariable Long farmId,
            @PathVariable Long cropId
    ) {
        log.info("{ InsuranceController } : insurance 추천 진입");
        log.info(" >> FarmId : " + farmId);
        log.info(" >> CropId : " + cropId);
        InsuranceRecommendResponseDto insuranceRecommendResponseDto = insuranceService.getInsuranceRecommend(farmId, cropId);
        log.info("{ InsuranceController } : insurance 추천 성공");
        return ResponseEntity.ok(insuranceRecommendResponseDto);
    }

}
