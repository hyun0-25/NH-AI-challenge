package com.project.backend.insurances.dto.response;

import com.project.backend.insurances.domain.Insurance;
import lombok.Builder;

@Builder
public record InsuranceDetailResponseDto(
        Long insuranceId,
        String insuranceName,
        String insuranceSubName,
        String insuranceVariety,
        String insuranceDescription,
        String insuranceSupportInfo,
        String insuranceConditionType,
        String insuranceCoverage,
        String insuranceDisaster,
        String insurancePurpose,
        String insuranceStartDate,
        String insuranceEndDate,
        String insurancePaymentReason
) {
    public static InsuranceDetailResponseDto fromInsurance(Insurance insurance) {
        return InsuranceDetailResponseDto.builder()
                .insuranceId(insurance.getInsuranceId())
                .insuranceName(insurance.getInsuranceName() + "(" + insurance.getInsuranceVariety() + ")")
                .insuranceSubName(insurance.getInsuranceSubName())
                .insuranceVariety(insurance.getInsuranceVariety())
                .insuranceDescription(insurance.getInsuranceDescription())
                .insuranceSupportInfo(
                        "정부 지원 " +
                                (insurance.getInsuranceGovernmentSupportMin() == insurance.getInsuranceGovernmentSupportMax()
                                        ? insurance.getInsuranceGovernmentSupportMin() + "" : insurance.getInsuranceGovernmentSupportMin() + "~" + insurance.getInsuranceGovernmentSupportMax())
                                + "% + 지차체 지원 " +
                                (insurance.getInsuranceLocalGovernmentSupportMin() + "~" + insurance.getInsuranceLocalGovernmentSupportMax() + "%")
                )
                .insuranceConditionType(insurance.getInsuranceConditionType().toString())
                .insuranceCoverage(insurance.getInsuranceCoverage())
                .insuranceDisaster(insurance.getInsuranceDisaster())
                .insurancePurpose(insurance.getInsurancePurpose())
                .insuranceStartDate(insurance.getInsuranceStartDate())
                .insuranceEndDate(insurance.getInsuranceEndDate())
                .insurancePaymentReason(insurance.getInsurancePaymentReason())
                .build();
    }
}
