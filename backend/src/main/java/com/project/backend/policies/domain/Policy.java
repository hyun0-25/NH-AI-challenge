package com.project.backend.policies.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "policy")
public class Policy extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyId;

    private String seq;

    private String typeDv;

    private String title;

    @Column(length = 65535)
    private String contents;

    private String applStDt;

    private String applEdDt;

    private String area1Nm;

    private String area2Nm;

    private String chargeAgency;

    private String chargeDept;

    private String chargeTel;

    @Column(length = 1000)
    private String infoUrl;

    private String totQuantity;

    private String price;

    private Policy(String seq, String typeDv, String title, String contents, String applStDt, String applEdDt, String area1Nm, String area2Nm, String chargeAgency, String chargeDept, String chargeTel, String infoUrl, String totQuantity, String price) {
        this.seq = seq;
        this.typeDv = typeDv;
        this.title = title;
        this.contents = contents;
        this.applStDt = applStDt;
        this.applEdDt = applEdDt;
        this.area1Nm = area1Nm;
        this.area2Nm = area2Nm;
        this.chargeAgency = chargeAgency;
        this.chargeDept = chargeDept;
        this.chargeTel = chargeTel;
        this.infoUrl = infoUrl;
        this.totQuantity = totQuantity;
        this.price = price;
    }

    public static Policy createPolicy(String seq, String typeDv, String title, String contents, String applStDt, String applEdDt, String area1Nm, String area2Nm, String chargeAgency, String chargeDept, String chargeTel, String infoUrl, String totQuantity, String price) {
        return new Policy(seq, typeDv, title, contents, applStDt, applEdDt, area1Nm, area2Nm, chargeAgency, chargeDept, chargeTel, infoUrl, totQuantity, price);
    }
}
