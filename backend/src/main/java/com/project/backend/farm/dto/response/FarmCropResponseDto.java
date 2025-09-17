package com.project.backend.farm.dto.response;

import com.project.backend.crops.dto.response.CropCategoryResponseDto;
import com.project.backend.farm.domain.Farm;
import com.project.backend.farm.domain.FarmType;
import lombok.Builder;

import java.util.List;

@Builder
public record FarmCropResponseDto(
        Long farmId,
        String farmZipCode,
        String farmLocation,
        String farmLocationDetail,
        FarmType farmType,
        String farmTypeOtherDescription,
        Integer farmArea,
        List<CropCategoryResponseDto> cropCategoryResponseDtoList
) {
    public static FarmCropResponseDto fromFarmCrop(Farm farm, List<CropCategoryResponseDto> cropCategoryResponseDtoList) {
        return FarmCropResponseDto.builder()
                .farmId(farm.getFarmId())
                .farmZipCode(farm.getFarmZipCode())
                .farmLocation(farm.getFarmLocation())
                .farmLocationDetail(farm.getFarmLocationDetail())
                .farmType(farm.getFarmType())
                .farmTypeOtherDescription(farm.getFarmTypeOtherDescription())
                .farmArea(farm.getFarmArea())
                .cropCategoryResponseDtoList(cropCategoryResponseDtoList)
                .build();
    }
}
