package com.project.backend.policies.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record PolicyRecommendResponseDto(
        List<PolicyRecommendListResponseDto> policyRecommendList,
        List<PolicyRecommendListResponseDto> policyOtherList
) {
    public static PolicyRecommendResponseDto fromPolicyRecommend(
            List<PolicyRecommendListResponseDto> policyRecommendList,
            List<PolicyRecommendListResponseDto> policyOtherList) {
        return PolicyRecommendResponseDto.builder()
                .policyRecommendList(policyRecommendList)
                .policyOtherList(policyOtherList)
                .build();
    }
}
