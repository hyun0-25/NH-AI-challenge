package com.project.backend.crops.dto.response;

import com.project.backend.crops.domain.CropCategory;
import com.project.backend.crops.domain.CropVariety;
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
                        .map(CropVarietyResponseDto::fromCropVariety)
                        .toList())
                .build();
    }

    public static CropCategoryResponseDto fromCropCategoryList(CropCategory cropCategory, List<CropVariety> cropVarieties) {
        return CropCategoryResponseDto.builder()
                .cropCategoryId(cropCategory.getCropCategoryId())
                .cropCategoryName(cropCategory.getCropCategoryName())
                .cropVarietyResponses(
                        cropVarieties.stream()
                                .map(CropVarietyResponseDto::fromCropVariety)
                                .toList()
                )
                .build();
    }
}
