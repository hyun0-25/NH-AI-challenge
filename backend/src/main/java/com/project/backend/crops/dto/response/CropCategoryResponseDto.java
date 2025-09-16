package com.project.backend.crops.dto.response;

import com.project.backend.crops.domain.CropCategory;
import lombok.Builder;

import java.util.List;

@Builder
public record CropCategoryResponseDto(
        Long cropCategoryId,
        String cropCategoryName,
        List<CropVarietyResponseDto> cropVarietyResponses
) {
    public static CropCategoryResponseDto fromCropCategory(CropCategory cropCategory) {
        return CropCategoryResponseDto.builder()
                .cropCategoryId(cropCategory.getCropCategoryId())
                .cropCategoryName(cropCategory.getCropCategoryName())
                .cropVarietyResponses(cropCategory.getCropVarieties().stream()
                        .map(CropVarietyResponseDto::fromCropVariety) // 메서드 레퍼런스 사용
                        .toList())
                .build();
    }
}
