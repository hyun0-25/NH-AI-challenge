package com.project.backend.policies.dto.response;

import com.project.backend.policies.domain.Policy;
import lombok.Builder;

@Builder
public record PolicyDetailResponseDto(
        Long policyId,
        String title,
        String contents,
        String eduTarget,
        String applDate, //applStDt ~ applEdDt,
        String area,  //area1 + area2
        String chargeAgency,
        String chargeDept,
        String chargeTel,
        String infoUrl,
        String totQuantity,
        String price
) {
    public static PolicyDetailResponseDto fromPolicy(Policy policy) {
        return PolicyDetailResponseDto.builder()
                .policyId(policy.getPolicyId())
                .title(policy.getTitle())
                .contents(policy.getContents())
                .eduTarget(policy.getEduTarget())
                .applDate(policy.getApplStDt() + " ~ " + policy.getApplEdDt())
                .area((policy.getArea1Nm() == null ? "" : policy.getArea1Nm()) + " "
                        + (policy.getArea2Nm() == null ? "" : policy.getArea2Nm()))
                .chargeAgency(policy.getChargeAgency())
                .infoUrl(policy.getInfoUrl())
                .totQuantity(policy.getTotQuantity())
                .price(policy.getPrice())
                .build();
    }
}
