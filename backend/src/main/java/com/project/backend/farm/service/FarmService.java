package com.project.backend.farm.service;

import com.project.backend.crops.domain.CropCategory;
import com.project.backend.crops.domain.CropVariety;
import com.project.backend.crops.dto.response.CropCategoryResponseDto;
import com.project.backend.crops.dto.response.CropVarietyResponseDto;
import com.project.backend.crops.repository.CropVarietyRepository;
import com.project.backend.farm.domain.Farm;
import com.project.backend.farm.domain.FarmCrop;
import com.project.backend.farm.dto.request.FarmCropRequestDto;
import com.project.backend.farm.dto.response.FarmCropResponseDto;
import com.project.backend.farm.repository.FarmCropRepository;
import com.project.backend.farm.repository.FarmRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FarmService {
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;
    private final CropVarietyRepository cropVarietyRepository;
    private final FarmCropRepository farmCropRepository;

    public FarmCropResponseDto createFarm(FarmCropRequestDto farmCropRequestDto) {
        log.info("{ FarmService } : farm & crops 생성");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        Integer farmCount = farmRepository.countAllByIsDeletedIsFalse();
        Farm farm = Farm.createFarm(
                user,
                farmCropRequestDto.farmZipCode(),
                farmCropRequestDto.farmLocation(),
                farmCropRequestDto.farmLocationDetail(),
                farmCropRequestDto.farmType(),
                farmCropRequestDto.farmTypeOtherDescription(),
                farmCropRequestDto.farmArea(),
                farmCount == 0 ? true : false
        );
        farmRepository.save(farm);

        List<CropVariety> cropVarietyList = new ArrayList<>();
        boolean isRepresent = true;
        for (Long cropVarietyId : farmCropRequestDto.cropVarietyList()) {
            CropVariety cropVariety = cropVarietyRepository.findByCropVarietyId(cropVarietyId);
            FarmCrop farmCrop = FarmCrop.createFarmCrop(farm, cropVariety, isRepresent);
            isRepresent = false;
            farmCropRepository.save(farmCrop);
            cropVarietyList.add(cropVariety);
        }

        // 부류별 그룹핑
        Map<CropCategory, List<CropVariety>> groupedByCategory = cropVarietyList.stream()
                .collect(Collectors.groupingBy(CropVariety::getCropCategory));
        // dto 변환
        List<CropCategoryResponseDto> cropCategoryResponseDtos = groupedByCategory.entrySet().stream()
                .map(entry -> {
                    CropCategory cropCategory = entry.getKey();
                    List<CropVariety> cropVarieties = entry.getValue();

                    return CropCategoryResponseDto.fromCropCategoryList(cropCategory, cropVarieties);
                })
                .toList();

        log.info("{ FarmService } : farm & crops 생성 성공");
        return FarmCropResponseDto.fromFarmCrop(farm, cropCategoryResponseDtos);
    }

}
