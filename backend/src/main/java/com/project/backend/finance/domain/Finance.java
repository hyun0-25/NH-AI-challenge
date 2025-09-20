package com.project.backend.finance.domain;

import com.project.backend.finance.converter.ProductRateTypeConverter;
import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "finance")
public class Finance extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long financeId;

    @Column(nullable = false)
    private String productName;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String productFeature;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String loanTarget;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String loanPeriod;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String loanLimit;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String repaymentMethod;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String principalRepaymentGuide;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String overdueGuide;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String collateralGuarantee;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String requiredDocuments;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String customerBurdenCosts;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String payment;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String precautions;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String others;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String complianceSupervisor;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String loanInterestRate;

    @Convert(converter = ProductRateTypeConverter.class)
    private ProductRateType rateType;

}
