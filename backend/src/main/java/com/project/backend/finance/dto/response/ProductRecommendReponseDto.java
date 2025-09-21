package com.project.backend.finance.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ProductRecommendReponseDto(
        List<ProductRecommendListResponseDto> productRecommendList,
        List<ProductRecommendListResponseDto> productOtherList
) {
    public static ProductRecommendReponseDto fromProductRecommend(
            List<ProductRecommendListResponseDto> productRecommendList,
            List<ProductRecommendListResponseDto> productOtherList) {
        return ProductRecommendReponseDto.builder()
                .productRecommendList(productRecommendList)
                .productOtherList(productOtherList)
                .build();
    }
}
