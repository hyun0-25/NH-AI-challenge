package com.project.backend.crops.controller;

import com.project.backend.crops.dto.response.CropCategoryResponseDto;
import com.project.backend.crops.service.CropService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/crops")
public class CropController {
    private final CropService cropService;

    @GetMapping
    public ResponseEntity<List<CropCategoryResponseDto>> getCrops() {
        log.info("{ CropController } : Crops 조회 진입");
        List<CropCategoryResponseDto> cropCategoryResponseDtoList = cropService.getCrops();
        log.info("{ CropController } : Crops 조회 성공");
        return ResponseEntity.ok(cropCategoryResponseDtoList);
    }
}
