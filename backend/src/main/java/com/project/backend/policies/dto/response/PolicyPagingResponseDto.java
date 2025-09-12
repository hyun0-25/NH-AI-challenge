package com.project.backend.policies.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PolicyPagingResponseDto(
        Integer currentPage,
        Integer beginRow,
        Integer pagePerRow,
        Integer startPage,
        Integer pageSize,
        Integer endPage,
        Integer lastPage,
        Integer totalCount
) {
}
