package com.project.backend.finance.dto.response;

import com.project.backend.finance.domain.Finance;
import lombok.Builder;

import java.util.List;

@Builder
public record ProductRecommendListResponseDto(
        Long productId,
        String productName,
        String productFeature

) {
    public static ProductRecommendListResponseDto fromProductList(Finance product) {
        return ProductRecommendListResponseDto.builder()
                .productId(product.getFinanceId())
                .productName(product.getProductName())
                .productFeature(product.getProductFeature())
                .build();
    }
}
