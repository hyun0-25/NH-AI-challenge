package com.project.backend.finance.controller;

import com.project.backend.finance.dto.response.ProductDetailResponseDto;
import com.project.backend.finance.dto.response.ProductRecommendReponseDto;
import com.project.backend.finance.service.ProductService;
import com.project.backend.policies.dto.response.PolicyDetailResponseDto;
import com.project.backend.policies.dto.response.PolicyRecommendResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{farmId}/{cropId}")
    public ResponseEntity<ProductRecommendReponseDto> getProductRecommend(
            @PathVariable Long farmId,
            @PathVariable Long cropId
    ) {
        log.info("{ ProductController } : product 추천 진입");
        log.info(" >> FarmId : " + farmId);
        log.info(" >> CropId : " + cropId);
        ProductRecommendReponseDto productRecommendReponseDto = productService.getProductRecommend(farmId, cropId);
        log.info("{ ProductController } : product 추천 성공");
        return ResponseEntity.ok(productRecommendReponseDto);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDetailResponseDto> getProduct(
            @PathVariable Long productId
    ) {
        log.info("{ ProductController } : product 상세조회 진입");
        log.info(" >> ProductId : " + productId);
        ProductDetailResponseDto policyDetailResponseDto = productService.getProduct(productId);
        log.info("{ ProductController } : product 상세조회 성공");
        return ResponseEntity.ok(policyDetailResponseDto);
    }
}
