package com.project.backend.policies.dto.response;

import com.project.backend.policies.domain.Policy;
import lombok.Builder;

@Builder
public record PolicyRecommendListResponseDto(
        Long policyId,
        String title,
        String applDate //applStDt ~ applEdDt
) {
    public static PolicyRecommendListResponseDto fromPolicyList(Policy policy) {
        return PolicyRecommendListResponseDto.builder()
                .policyId(policy.getPolicyId())
                .title(policy.getTitle())
                .applDate(policy.getApplStDt() + " ~ " + policy.getApplEdDt())
                .build();
    }
}
