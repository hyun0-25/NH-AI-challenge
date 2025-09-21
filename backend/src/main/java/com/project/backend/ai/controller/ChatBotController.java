package com.project.backend.ai.controller;

import com.project.backend.ai.dto.request.ChatBotQuestionRequestDto;
import com.project.backend.ai.dto.request.ChatBotRequestDto;
import com.project.backend.ai.dto.response.ChatBotResponseDto;
import com.project.backend.ai.service.ChatBotService;
import com.project.backend.finance.dto.response.ProductRecommendReponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat-bot")
public class ChatBotController {
    private final ChatBotService chatBotService;

    @PostMapping("/{farmId}/{cropId}")
    public ResponseEntity<ChatBotResponseDto> createChatBotAnswer(
            @PathVariable Long farmId,
            @PathVariable Long cropId,
            @RequestBody ChatBotQuestionRequestDto chatBotQuestionRequestDto
            ) {
        log.info("{ ChatBotController } : chatbot 응답 진입");
        log.info(" >> FarmId : " + farmId);
        log.info(" >> CropId : " + cropId);
        log.info(" >>>> ChatBotQuestionRequestDto : " + chatBotQuestionRequestDto);
        ChatBotResponseDto chatBotResponseDto = chatBotService.createChatBotAnswer(chatBotQuestionRequestDto, farmId, cropId);
        log.info("{ ChatBotController } : chatbot 응답 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(chatBotResponseDto);
    }
}
