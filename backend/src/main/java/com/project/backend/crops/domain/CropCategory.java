package com.project.backend.crops.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "crop_category")
public class CropCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cropCategoryId;

    @OneToMany(mappedBy = "cropCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CropVariety> cropVarieties = new ArrayList<>();

    @Column(nullable = false)
    private String cropCategoryName;

    private CropCategory(List<CropVariety> cropVarieties, String cropCategoryName) {
        this.cropVarieties = cropVarieties;
        this.cropCategoryName = cropCategoryName;
    }
}
