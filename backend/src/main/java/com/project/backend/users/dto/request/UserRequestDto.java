package com.project.backend.users.dto.request;

import java.time.LocalDate;

public record UserRequestDto(
        String userName,
        LocalDate userBirthDate
) {
}
