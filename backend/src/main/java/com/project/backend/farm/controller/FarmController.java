package com.project.backend.farm.controller;

import com.project.backend.farm.dto.request.FarmCropRequestDto;
import com.project.backend.farm.dto.request.FarmCropUpdateRequestDto;
import com.project.backend.farm.dto.response.FarmCropResponseDto;
import com.project.backend.farm.service.FarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/farms")
public class FarmController {
    private final FarmService farmService;

    @PostMapping
    public ResponseEntity<FarmCropResponseDto> createFarm(@RequestBody FarmCropRequestDto farmCropRequestDto) {
        log.info("{ FarmController } : Farm & Crops 생성 진입");
        FarmCropResponseDto farmCropResponseDto = farmService.createFarm(farmCropRequestDto);
        log.info("{ FarmController } : Farm & Crops 생성 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(farmCropResponseDto);
    }

    @PutMapping("/{farmId}")
    public ResponseEntity<FarmCropResponseDto> updateFarmCrop(
            @PathVariable Long farmId,
            @RequestBody FarmCropUpdateRequestDto farmCropUpdateRequestDto) {
        log.info("{ FarmController } : Farm & Crops 수정 진입");
        log.info(" >> FarmId : " + farmId);
        farmService.updateFarmCrop(farmId, farmCropUpdateRequestDto);
        log.info("{ FarmController } : Farm & Crops 수정 진입");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{farmId}")
    public ResponseEntity<FarmCropResponseDto> getFarmCrop(
            @PathVariable Long farmId) {
        log.info("{ FarmController } : Farm & Crops 상세조회 진입");
        log.info(" >> FarmId : " + farmId);
        FarmCropResponseDto farmCropResponseDto = farmService.getFarmCrop(farmId);
        log.info("{ FarmController } : Farm & Crops 상세조회 진입");
        return ResponseEntity.ok(farmCropResponseDto);
    }

    @GetMapping
    public ResponseEntity<List<FarmCropResponseDto>> getAllFarmCrop() {
        log.info("{ FarmController } : Farm & Crops 리스트 조회 진입");
        List<FarmCropResponseDto> farmCropResponseDtoList = farmService.getAllFarmCrop();
        log.info("{ FarmController } : Farm & Crops 리스트 조회 진입");
        return ResponseEntity.ok(farmCropResponseDtoList);
    }

    @DeleteMapping("/{farmId}")
    public ResponseEntity<FarmCropResponseDto> deleteFarm(@PathVariable Long farmId) {
        log.info("{ FarmController } : Farm & Crops 삭제 진입");
        log.info(" >> FarmId : " + farmId);
        farmService.deleteFarm(farmId);
        log.info("{ FarmController } : Farm & Crops 삭제 진입");
        return ResponseEntity.ok().build();
    }

}
