package com.project.backend.finance.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ProductErrorCode implements ErrorCode {
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "PRODUCT_001", "금융상품 정보를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
