package com.project.backend.policies.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.ai.dto.request.RecommendRequestDto;
import com.project.backend.ai.dto.response.RecommendResponseDto;
import com.project.backend.ai.service.RecommendService;
import com.project.backend.farm.domain.FarmCrop;
import com.project.backend.farm.exception.FarmErrorCode;
import com.project.backend.farm.repository.FarmCropRepository;
import com.project.backend.global.exception.BaseException;
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
import org.springframework.web.client.RestTemplate;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PolicyService {
    @Value("${POLICY_API_KEY}")
    private String policyApiKey;
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final UserRepository userRepository;
    private final PolicyRepository policyRepository;
    private final FarmCropRepository farmCropRepository;
    private final PolicyJdbcRepository policyJdbcRepository;
    private final RecommendService recommendService;

    public void callPolicyApi() throws IOException {
        log.info("{ PolicyService } : policy api 저장");
        String type = "json";

        StringBuilder urlBuilder = new StringBuilder("https://rda.go.kr/young/api/policyList");

        StringBuilder parameter = new StringBuilder();
        parameter.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + policyApiKey);  /*Service Key*/
        parameter.append("&" + URLEncoder.encode("typeDv", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8")); /*카테고리*/
        parameter.append("&" + URLEncoder.encode("rowCnt", "UTF-8") + "=" + URLEncoder.encode("16824", "UTF-8")); /* 가져올 row 수*/

        URL url = new URL(urlBuilder.toString() + parameter.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/" + type);

        System.out.println("response code : " + conn.getResponseCode());

        BufferedReader rd;

        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }


        StringBuilder sb = new StringBuilder();
        String line;

        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();

        ObjectMapper objectMapper = new ObjectMapper();
        PolicyResponseDto response = objectMapper.readValue(sb.toString(), PolicyResponseDto.class);
        List<PolicyListResponseDto> policyListResponseDtos = response.policyListResponseDtos();
        List<Policy> policyList = new ArrayList<>();

        for (PolicyListResponseDto policyDto : policyListResponseDtos) {
            Policy policy = Policy.createPolicy(
                    policyDto.seq(),
                    policyDto.typeDv(),
                    policyDto.title(),
                    policyDto.contents(),
                    policyDto.applStDt(),
                    policyDto.applEdDt(),
                    policyDto.eduTarget(),
                    policyDto.area1Nm(),
                    policyDto.area2Nm(),
                    policyDto.chargeAgency(),
                    policyDto.chargeDept(),
                    policyDto.chargeTel(),
                    policyDto.infoUrl(),
                    policyDto.totQuantity(),
                    policyDto.price()
            );
            policyList.add(policy);
        }

//        policyRepository.saveAll(policyList);  // saveAll
        policyJdbcRepository.bulkInsert(policyList);  // bulkInsert
        log.info("{ PolicyService } : policy api 저장 성공");
    }

    public PolicyRecommendResponseDto getPolicyRecommend(Long farmId, Long cropId) {
        log.info("{ PolicyService } : policy 추천 조회");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        FarmCrop farmCrop = farmCropRepository.findFarmCropByFarmIdAndCropIdAndIsDeleted(farmId, cropId);
        if (farmCrop == null)
            throw BaseException.type(FarmErrorCode.FARM_CROP_NOT_FOUND);

        RecommendResponseDto recommendResponseDto = recommendService.getAIRecommendId("policy", user, farmCrop);

        // 모든 정책 정보
        List<Policy> policyList = policyRepository.findAll();

        List<PolicyRecommendListResponseDto> policyRecommendList = new ArrayList<>();
        List<PolicyRecommendListResponseDto> policyOtherList = new ArrayList<>();
        // 맞춤 정보 & 이외 정보 그룹핑
        for (Policy policy : policyList) {
            if (recommendResponseDto.recommendId().contains(policy.getPolicyId())) {
                policyRecommendList.add(PolicyRecommendListResponseDto.fromPolicyList(policy));
            } else {
                policyOtherList.add(PolicyRecommendListResponseDto.fromPolicyList(policy));
            }
        }

        log.info("{ PolicyService } : policy 추천 조회 성공");
        return PolicyRecommendResponseDto.fromPolicyRecommend(policyRecommendList, policyOtherList);
    }

    public PolicyDetailResponseDto getPolicy(Long policyId) {
        log.info("{ PolicyService } : policy 상세조회");
        Policy policy = policyRepository.findPolicyByPolicyId(policyId);
        if (policy == null)
            throw BaseException.type(PolicyErrorCode.POLICY_NOT_FOUND);

        PolicyDetailResponseDto policyDetailResponseDto = PolicyDetailResponseDto.fromPolicy(policy);

        log.info("{ PolicyService } : policy 상세조회 성공");
        return policyDetailResponseDto;
    }


}
