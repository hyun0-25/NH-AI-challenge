package com.project.backend.crops.dto.response;

import com.project.backend.crops.domain.CropVariety;
import lombok.Builder;

@Builder
public record CropVarietyResponseDto(
        Long cropVarietyId,
        String cropVarietyName
) {
    public static CropVarietyResponseDto fromCropVariety(CropVariety cropVariety) {
        return CropVarietyResponseDto.builder()
                .cropVarietyId(cropVariety.getCropVarietyId())
                .cropVarietyName(cropVariety.getCropVarietyName())
                .build();
    }
}
