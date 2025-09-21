package com.project.backend.insurances.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record InsuranceRecommendResponseDto(
        List<InsuranceRecommendListResponseDto> insuranceRecommendList,
        List<InsuranceRecommendListResponseDto> insuranceOtherList
) {
    public static InsuranceRecommendResponseDto fromInsuranceRecommend(
            List<InsuranceRecommendListResponseDto> insuranceRecommendList,
            List<InsuranceRecommendListResponseDto> insuranceOtherList) {
        return InsuranceRecommendResponseDto.builder()
                .insuranceRecommendList(insuranceRecommendList)
                .insuranceOtherList(insuranceOtherList)
                .build();
    }
}
