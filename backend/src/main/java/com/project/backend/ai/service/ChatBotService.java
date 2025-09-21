package com.project.backend.ai.service;

import com.project.backend.ai.dto.request.ChatBotQuestionRequestDto;
import com.project.backend.ai.dto.request.ChatBotRequestDto;
import com.project.backend.ai.dto.request.RecommendRequestDto;
import com.project.backend.ai.dto.response.ChatBotResponseDto;
import com.project.backend.ai.dto.response.RecommendResponseDto;
import com.project.backend.farm.domain.FarmCrop;
import com.project.backend.farm.exception.FarmErrorCode;
import com.project.backend.farm.repository.FarmCropRepository;
import com.project.backend.global.exception.BaseException;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.UUID;

import static com.project.backend.ai.service.RecommendService.calculateAge;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatBotService {
    @Value("${FASTAPI_SERVER_URL}")
    private String fastApiServerURL;
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final UserRepository userRepository;
    private final FarmCropRepository farmCropRepository;

    public ChatBotResponseDto createChatBotAnswer(ChatBotQuestionRequestDto chatBotQuestionRequestDto, Long farmId, Long cropId) {
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        FarmCrop farmCrop = farmCropRepository.findFarmCropByFarmIdAndCropIdAndIsDeleted(farmId, cropId);
        if (farmCrop == null)
            throw BaseException.type(FarmErrorCode.FARM_CROP_NOT_FOUND);

        RestTemplate restTemplate = new RestTemplate();
        String url = fastApiServerURL + "/chat-bot";
        LocalDate today = LocalDate.now();
        int age = calculateAge(user.getUserBirthDate(), today);

        String userInfo = user.getUserBirthDate().getYear() + "년생 "
                + (age <= 40 ? "청년 " : "") + "농부, "
                + farmCrop.getFarm().getFarmLocation() + " 거주, "
                + farmCrop.getCropVariety().getCropVarietyName() + " 재배";

        ChatBotRequestDto chatBotRequestDto = new ChatBotRequestDto(
                chatBotQuestionRequestDto.query(),
                chatBotQuestionRequestDto.docName(),
                userInfo
        );

        return restTemplate.postForObject(url, chatBotRequestDto, ChatBotResponseDto.class);
    }
}
