package com.project.backend.ai.dto.response;

import java.util.List;

public record ChatBotResponseDto(
        String summary,
        String response,
        List<Long> docIds
) {
}
