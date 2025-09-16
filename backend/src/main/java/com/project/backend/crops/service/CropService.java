package com.project.backend.crops.service;

import com.project.backend.crops.domain.CropCategory;
import com.project.backend.crops.dto.response.CropCategoryResponseDto;
import com.project.backend.crops.repository.CropRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CropService {
    private final CropRepository cropRepository;

    public List<CropCategoryResponseDto> getCrops() {
        log.info("{ CropService } : crops 조회");
        List<CropCategory> cropCategoryList = cropRepository.findAllWithVarieties();
        List<CropCategoryResponseDto> cropCategoryResponseDtoList = new ArrayList<>();
        for (CropCategory cropCategory : cropCategoryList) {
            cropCategoryResponseDtoList.add(CropCategoryResponseDto.fromCropCategory(cropCategory));
        }
        log.info("{ CropService } : crops 조회 완료");
        return cropCategoryResponseDtoList;
    }

}
