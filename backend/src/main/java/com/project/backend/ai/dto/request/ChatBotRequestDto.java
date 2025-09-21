package com.project.backend.ai.dto.request;

public record ChatBotRequestDto(
        String query,
        String docName,
        String userInfo
) {
}
