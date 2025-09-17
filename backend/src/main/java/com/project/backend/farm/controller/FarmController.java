package com.project.backend.farm.controller;

import com.project.backend.farm.dto.request.FarmCropRequestDto;
import com.project.backend.farm.dto.response.FarmCropResponseDto;
import com.project.backend.farm.service.FarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/farms")
public class FarmController {
    private final FarmService farmService;

    @PostMapping
    public ResponseEntity<FarmCropResponseDto> createSchedule(@RequestBody FarmCropRequestDto farmCropRequestDto) {
        log.info("{ FarmController } : Farm & Crops 생성 진입");
        FarmCropResponseDto farmCropResponseDto = farmService.createFarm(farmCropRequestDto);
        log.info("{ FarmController } : Farm & Crops 생성 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(farmCropResponseDto);
    }
}
