package com.project.backend.finance.dto.response;

import com.project.backend.finance.domain.Finance;
import com.project.backend.finance.domain.ProductRateType;
import com.project.backend.policies.dto.response.PolicyDetailResponseDto;
import lombok.Builder;

@Builder
public record ProductDetailResponseDto(
        Long financeId,
        String productName,
        String productFeature,
        String loanTarget,
        String loanPeriod,
        String loanLimit,
        String repaymentMethod,
        String principalRepaymentGuide,
        String overdueGuide,
        String collateralGuarantee,
        String requiredDocuments,
        String customerBurdenCosts,
        String payment,
        String precautions,
        String others,
        String complianceSupervisor,
        String loanInterestRate,
        String rateType
) {
    public static ProductDetailResponseDto fromProduct(Finance finance) {
        return ProductDetailResponseDto.builder()
                .financeId(finance.getFinanceId())
                .productName(finance.getProductName())
                .productFeature(finance.getProductFeature())
                .loanTarget(finance.getLoanTarget())
                .loanPeriod(finance.getLoanPeriod())
                .loanLimit(finance.getLoanLimit())
                .repaymentMethod(finance.getRepaymentMethod())
                .principalRepaymentGuide(finance.getPrincipalRepaymentGuide())
                .overdueGuide(finance.getOverdueGuide())
                .collateralGuarantee(finance.getCollateralGuarantee())
                .requiredDocuments(finance.getRequiredDocuments())
                .customerBurdenCosts(finance.getCustomerBurdenCosts())
                .payment(finance.getPayment())
                .precautions(finance.getPrecautions())
                .others(finance.getOthers())
                .complianceSupervisor(finance.getComplianceSupervisor())
                .loanInterestRate(finance.getLoanInterestRate())
                .rateType(finance.getRateType().getDescription())
                .build();
    }
}
