package com.project.backend.policies.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PolicyErrorCode implements ErrorCode {
    POLICY_NOT_FOUND(HttpStatus.NOT_FOUND, "POLICY_001", "정책 정보를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
