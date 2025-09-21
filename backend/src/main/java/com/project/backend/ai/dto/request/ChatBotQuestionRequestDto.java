package com.project.backend.ai.dto.request;

public record ChatBotQuestionRequestDto(
        String docName,
        String query
) {
}
