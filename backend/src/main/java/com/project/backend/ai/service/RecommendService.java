package com.project.backend.ai.service;

import com.project.backend.ai.dto.request.RecommendRequestDto;
import com.project.backend.ai.dto.response.RecommendResponseDto;
import com.project.backend.farm.domain.FarmCrop;
import com.project.backend.users.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RecommendService {
    @Value("${FASTAPI_SERVER_URL}")
    private String fastApiServerURL;
    @Value("${TEST_USER_UUID}")
    private UUID userId;

    public RecommendResponseDto getAIRecommendId(String docName, User user, FarmCrop farmCrop) {
        RestTemplate restTemplate = new RestTemplate();
        String url = fastApiServerURL + "/recommend";
        LocalDate today = LocalDate.now();
        int age = calculateAge(user.getUserBirthDate(), today);

        String userInfo = user.getUserBirthDate().getYear() + "년생 "
                + (age <= 40 ? "청년 " : "") + "농부, "
                + farmCrop.getFarm().getFarmLocation() + " 거주, "
                + farmCrop.getCropVariety().getCropVarietyName() + " 재배";
        RecommendRequestDto recommendRequestDto = new RecommendRequestDto(docName, userInfo);

        return restTemplate.postForObject(url, recommendRequestDto, RecommendResponseDto.class);
    }

    public static int calculateAge(LocalDate birthDate, LocalDate currentDate) {
        if (birthDate == null || currentDate == null) {
            throw new IllegalArgumentException("날짜가 null입니다.");
        }

        int age = Period.between(birthDate, currentDate).getYears();

        // 생일이 아직 안 지났으면 1살 빼기
        if (currentDate.getMonthValue() < birthDate.getMonthValue() ||
                (currentDate.getMonthValue() == birthDate.getMonthValue() &&
                        currentDate.getDayOfMonth() < birthDate.getDayOfMonth())) {
            age--;
        }

        return age;
    }

}

