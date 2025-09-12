package com.project.backend.policies.dto.response;

public record PolicyListResponseDto(
        String seq,
        String typeDv,
        String title,
        String contents,
        String applStDt,
        String applEdDt,
        String area1Nm,
        String area2Nm,
        String chargeAgency,
        String eduStDt,
        String eduEdDt,
        String eduTime,
        String eduCnt,
        String eduMethod,
        String eduMethod2,
        String eduMethod3,
        String eduTarget,
        String chargeDept,
        String chargeTel,
        String infoUrl,
        String totQuantity,
        String price
) {
}
