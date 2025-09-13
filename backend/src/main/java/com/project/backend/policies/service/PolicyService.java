package com.project.backend.policies.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.policies.domain.Policy;
import com.project.backend.policies.dto.response.PolicyListResponseDto;
import com.project.backend.policies.dto.response.PolicyResponseDto;
import com.project.backend.policies.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PolicyService {
    @Value("${POLICY_API_KEY}")
    private String policyApiKey;
    private final PolicyRepository policyRepository;

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

        policyRepository.saveAll(policyList);
        log.info("{ PolicyService } : policy api 저장 성공");
    }


}
