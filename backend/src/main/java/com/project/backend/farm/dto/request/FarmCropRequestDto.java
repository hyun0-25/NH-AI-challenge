package com.project.backend.farm.dto.request;

import com.project.backend.farm.domain.FarmAreaUnitType;
import com.project.backend.farm.domain.FarmType;

import java.util.List;

public record FarmCropRequestDto(
        String farmZipCode,
        String farmLocation,
        String farmLocationDetail,
        FarmType farmType,
        String farmTypeOtherDescription,
        Integer farmArea,
        FarmAreaUnitType farmAreaUnitType,
        List<Long> cropVarietyList
) {
}
