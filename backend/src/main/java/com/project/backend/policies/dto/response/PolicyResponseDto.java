package com.project.backend.policies.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record PolicyResponseDto(
        @JsonProperty("policy_paging")
        PolicyPagingResponseDto policyPagingResponseDto,
        @JsonProperty("policy_list")
        List<PolicyListResponseDto> policyListResponseDtos
) {
}
