package com.project.backend.insurances.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum InsuranceErrorCode implements ErrorCode {
    INSURANCE_NOT_FOUND(HttpStatus.NOT_FOUND, "INSURANCE_001", "보험 정보를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
