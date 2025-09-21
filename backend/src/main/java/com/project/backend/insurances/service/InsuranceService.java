package com.project.backend.insurances.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.ai.dto.response.RecommendResponseDto;
import com.project.backend.ai.service.RecommendService;
import com.project.backend.farm.domain.FarmCrop;
import com.project.backend.farm.exception.FarmErrorCode;
import com.project.backend.farm.repository.FarmCropRepository;
import com.project.backend.global.exception.BaseException;
import com.project.backend.insurances.domain.Insurance;
import com.project.backend.insurances.dto.response.InsuranceRecommendListResponseDto;
import com.project.backend.insurances.dto.response.InsuranceRecommendResponseDto;
import com.project.backend.insurances.respository.InsuranceRepository;
import com.project.backend.policies.domain.Policy;
import com.project.backend.policies.dto.response.*;
import com.project.backend.policies.exception.PolicyErrorCode;
import com.project.backend.policies.repository.PolicyJdbcRepository;
import com.project.backend.policies.repository.PolicyRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class InsuranceService {
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final UserRepository userRepository;
    private final FarmCropRepository farmCropRepository;
    private final RecommendService recommendService;
    private final InsuranceRepository insuranceRepository;


    public InsuranceRecommendResponseDto getInsuranceRecommend(Long farmId, Long cropId) {
        log.info("{ InsuranceService } : policy 추천 조회");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        FarmCrop farmCrop = farmCropRepository.findFarmCropByFarmIdAndCropIdAndIsDeleted(farmId, cropId);
        if (farmCrop == null)
            throw BaseException.type(FarmErrorCode.FARM_CROP_NOT_FOUND);

        RecommendResponseDto recommendResponseDto = recommendService.getAIRecommendId("insurance", user, farmCrop);

        // 모든 보험 정보
        List<Insurance> insuranceList = insuranceRepository.findAll();

        List<InsuranceRecommendListResponseDto> insuranceRecommendList = new ArrayList<>();
        List<InsuranceRecommendListResponseDto> insuranceOtherList = new ArrayList<>();
        // 맞춤 정보 & 이외 정보 그룹핑
        for (Insurance insurance : insuranceList) {
            if (recommendResponseDto.recommendId().contains(insurance.getInsuranceId())) {
                insuranceRecommendList.add(InsuranceRecommendListResponseDto.fromInsuranceList(insurance));
            } else {
                insuranceOtherList.add(InsuranceRecommendListResponseDto.fromInsuranceList(insurance));
            }
        }

        log.info("{ InsuranceService } : policy 추천 조회 성공");
        return InsuranceRecommendResponseDto.fromInsuranceRecommend(insuranceRecommendList, insuranceOtherList);
    }


}
