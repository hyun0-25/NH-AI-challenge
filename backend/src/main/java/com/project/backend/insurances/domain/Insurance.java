package com.project.backend.insurances.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "insurance")
public class Insurance extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long insuranceId;

    private String insuranceName;

    private String insuranceSubName;

    private String insuranceDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InsuranceConditionType insuranceConditionType;

    private String insuranceCoverage;

    private String insuranceDisaster;

    private String insuranceVariety;

    private String insurancePurpose;

    private String insuranceStartDate;

    private String insuranceEndDate;

    private String insurancePaymentReason;

    private Integer insuranceGovernmentSupportMin;

    private Integer insuranceGovernmentSupportMax;

    private Integer insuranceLocalGovernmentSupportMin;

    private Integer insuranceLocalGovernmentSupportMax;
}
