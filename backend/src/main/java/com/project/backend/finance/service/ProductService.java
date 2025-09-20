package com.project.backend.finance.service;

import com.project.backend.finance.domain.Finance;
import com.project.backend.finance.dto.response.ProductDetailResponseDto;
import com.project.backend.finance.exception.ProductErrorCode;
import com.project.backend.finance.repository.ProductRepository;
import com.project.backend.global.exception.BaseException;
import com.project.backend.policies.domain.Policy;
import com.project.backend.policies.dto.response.PolicyDetailResponseDto;
import com.project.backend.policies.exception.PolicyErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;


    public ProductDetailResponseDto getProduct(Long productId) {
        log.info("{ ProductService } : product 상세조회");
        Finance product = productRepository.findFinanceByFinanceId(productId);
        if (product == null)
            throw BaseException.type(ProductErrorCode.PRODUCT_NOT_FOUND);

        ProductDetailResponseDto productDetailResponseDto = ProductDetailResponseDto.fromProduct(product);

        log.info("{ ProductService } : product 상세조회 성공");
        return productDetailResponseDto;
    }
}
