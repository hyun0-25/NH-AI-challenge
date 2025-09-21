package com.project.backend.finance.service;

import com.project.backend.ai.dto.response.RecommendResponseDto;
import com.project.backend.ai.service.RecommendService;
import com.project.backend.farm.domain.FarmCrop;
import com.project.backend.farm.exception.FarmErrorCode;
import com.project.backend.farm.repository.FarmCropRepository;
import com.project.backend.finance.domain.Finance;
import com.project.backend.finance.dto.response.ProductDetailResponseDto;
import com.project.backend.finance.dto.response.ProductRecommendListResponseDto;
import com.project.backend.finance.dto.response.ProductRecommendReponseDto;
import com.project.backend.finance.exception.ProductErrorCode;
import com.project.backend.finance.repository.ProductRepository;
import com.project.backend.global.exception.BaseException;
import com.project.backend.policies.domain.Policy;
import com.project.backend.policies.dto.response.PolicyDetailResponseDto;
import com.project.backend.policies.dto.response.PolicyRecommendListResponseDto;
import com.project.backend.policies.dto.response.PolicyRecommendResponseDto;
import com.project.backend.policies.exception.PolicyErrorCode;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final FarmCropRepository farmCropRepository;
    private final RecommendService recommendService;


    public ProductDetailResponseDto getProduct(Long productId) {
        log.info("{ ProductService } : product 상세조회");
        Finance product = productRepository.findFinanceByFinanceId(productId);
        if (product == null)
            throw BaseException.type(ProductErrorCode.PRODUCT_NOT_FOUND);

        ProductDetailResponseDto productDetailResponseDto = ProductDetailResponseDto.fromProduct(product);

        log.info("{ ProductService } : product 상세조회 성공");
        return productDetailResponseDto;
    }

    public ProductRecommendReponseDto getProductRecommend(Long farmId, Long cropId) {
        log.info("{ ProductService } : product 추천 조회");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        FarmCrop farmCrop = farmCropRepository.findFarmCropByFarmIdAndCropIdAndIsDeleted(farmId, cropId);
        if (farmCrop == null)
            throw BaseException.type(FarmErrorCode.FARM_CROP_NOT_FOUND);

        RecommendResponseDto recommendResponseDto = recommendService.getAIRecommendId("finance", user, farmCrop);

        // 모든 금융상품 정보
        List<Finance> financeList = productRepository.findAll();

        List<ProductRecommendListResponseDto> productRecommendList = new ArrayList<>();
        List<ProductRecommendListResponseDto> productOtherList = new ArrayList<>();
        // 맞춤 정보 & 이외 정보 그룹핑
        for (Finance product : financeList) {
            if (recommendResponseDto.recommendId().contains(product.getFinanceId())) {
                productRecommendList.add(ProductRecommendListResponseDto.fromProductList(product));
            } else {
                productOtherList.add(ProductRecommendListResponseDto.fromProductList(product));
            }
        }

        log.info("{ ProductService } : product 추천 조회 성공");
        return ProductRecommendReponseDto.fromProductRecommend(productRecommendList, productOtherList);
    }
}
