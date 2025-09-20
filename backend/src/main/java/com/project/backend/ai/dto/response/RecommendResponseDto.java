package com.project.backend.ai.dto.response;

import java.util.List;

public record RecommendResponseDto(
        List<Long> recommendId
) {
}
