package com.project.backend.crops.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "crop_variety")
public class CropVariety extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cropVarietyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_category_id")
    private CropCategory cropCategory;

    @Column(nullable = false)
    private String cropVarietyName;

    private CropVariety(CropCategory cropCategory, String cropVarietyName) {
        this.cropCategory = cropCategory;
        this.cropVarietyName = cropVarietyName;
    }
}
