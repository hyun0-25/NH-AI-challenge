package com.project.backend.farm.domain;

import com.project.backend.crops.domain.CropVariety;
import com.project.backend.global.BaseEntity;
import com.project.backend.users.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "farm_crop")
public class FarmCrop extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long farmCropId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id")
    private Farm farm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_variety_id")
    private CropVariety cropVariety;

    @Column(nullable = false)
    private Boolean farmCropIsRepresent;

    private FarmCrop(Farm farm, CropVariety cropVariety, Boolean farmCropIsRepresent) {
        this.farm = farm;
        this.cropVariety = cropVariety;
        this.farmCropIsRepresent = farmCropIsRepresent;
    }

    public static FarmCrop createFarmCrop(Farm farm, CropVariety cropVariety, Boolean farmCropIsRepresent) {
        return new FarmCrop(farm, cropVariety, farmCropIsRepresent);
    }
}
