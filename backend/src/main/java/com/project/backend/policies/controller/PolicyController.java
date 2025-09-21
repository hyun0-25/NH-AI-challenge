package com.project.backend.policies.controller;

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

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/policies")
public class PolicyController {
    private final PolicyService policyService;

    @GetMapping("/call-api")
    public ResponseEntity<Void> callPolicyApi() throws IOException {
        log.info("{ PolicyController } : policy API 호출 진입");
        policyService.callPolicyApi();
        log.info("{ PolicyController } : policy API 호출 성공");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{farmId}/{cropId}")
    public ResponseEntity<PolicyRecommendResponseDto> getPolicyRecommend(
            @PathVariable Long farmId,
            @PathVariable Long cropId
    ) {
        log.info("{ PolicyController } : policy 추천 진입");
        log.info(" >> FarmId : " + farmId);
        log.info(" >> CropId : " + cropId);
        PolicyRecommendResponseDto policyRecommendResponseDto = policyService.getPolicyRecommend(farmId, cropId);
        log.info("{ PolicyController } : policy 추천 성공");
        return ResponseEntity.ok(policyRecommendResponseDto);
    }

    @GetMapping("/{policyId}")
    public ResponseEntity<PolicyDetailResponseDto> getPolicy(
            @PathVariable Long policyId
    ) {
        log.info("{ PolicyController } : policy 상세조회 진입");
        log.info(" >> PolicyId : " + policyId);
        PolicyDetailResponseDto policyDetailResponseDto = policyService.getPolicy(policyId);
        log.info("{ PolicyController } : policy 상세조회 성공");
        return ResponseEntity.ok(policyDetailResponseDto);
    }

}
