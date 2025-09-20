package com.project.backend.farm.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FarmErrorCode implements ErrorCode {
    FARM_NOT_FOUND(HttpStatus.NOT_FOUND, "FARM_001", "농장 정보를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
