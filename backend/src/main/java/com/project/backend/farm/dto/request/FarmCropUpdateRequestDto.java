package com.project.backend.farm.dto.request;

import java.util.List;

public record FarmCropUpdateRequestDto(
        List<Long> cropVarietyList
) {
}
