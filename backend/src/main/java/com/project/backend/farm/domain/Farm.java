package com.project.backend.farm.domain;

import com.project.backend.global.BaseEntity;
import com.project.backend.users.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "farm")
public class Farm extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long farmId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FarmCrop> farmCropList = new ArrayList<>();

    @Column(nullable = false)
    private String farmZipCode;

    @Column(nullable = false)
    private String farmLocation;

    @Column(nullable = false)
    private String farmLocationDetail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FarmType farmType;

    private String farmTypeOtherDescription;

    @Column(nullable = false)
    private Integer farmArea;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FarmAreaUnitType farmAreaUnitType;

    private Farm(User user, String farmZipCode, String farmLocation, String farmLocationDetail, FarmType farmType, String farmTypeOtherDescription, Integer farmArea, FarmAreaUnitType farmAreaUnitType) {
        this.user = user;
        this.farmZipCode = farmZipCode;
        this.farmLocation = farmLocation;
        this.farmLocationDetail = farmLocationDetail;
        this.farmType = farmType;
        this.farmTypeOtherDescription = farmTypeOtherDescription;
        this.farmArea = farmArea;
        this.farmAreaUnitType = farmAreaUnitType;
    }

    public static Farm createFarm(User user, String farmZipCode, String farmLocation, String farmLocationDetail, FarmType farmType, String farmTypeOtherDescription, Integer farmArea, FarmAreaUnitType farmAreaUnitType) {
        return new Farm(user, farmZipCode, farmLocation, farmLocationDetail, farmType, farmTypeOtherDescription, farmArea, farmAreaUnitType);
    }
}
