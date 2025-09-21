package com.project.backend.insurances.dto.response;

import com.project.backend.insurances.domain.Insurance;
import com.project.backend.policies.domain.Policy;
import lombok.Builder;

@Builder
public record InsuranceRecommendListResponseDto(
        Long insuranceId,
        String insuranceName,
        String insuranceDescription,
        String insuranceSupportInfo // 정부지원+지자체지원 비율

) {
    public static InsuranceRecommendListResponseDto fromInsuranceList(Insurance insurance) {
        return InsuranceRecommendListResponseDto.builder()
                .insuranceId(insurance.getInsuranceId())
                .insuranceName(insurance.getInsuranceName())
                .insuranceDescription(insurance.getInsuranceDescription())
                .insuranceSupportInfo(
                        "정부 지원 " +
                                (insurance.getInsuranceGovernmentSupportMin() == insurance.getInsuranceGovernmentSupportMax()
                                        ? insurance.getInsuranceGovernmentSupportMin() + "" : insurance.getInsuranceGovernmentSupportMin() + "~" + insurance.getInsuranceGovernmentSupportMax())
                                + "% + 지차체 지원 " +
                                (insurance.getInsuranceLocalGovernmentSupportMin() + "~" + insurance.getInsuranceLocalGovernmentSupportMax() + "%")
                )
                .build();
    }
}
