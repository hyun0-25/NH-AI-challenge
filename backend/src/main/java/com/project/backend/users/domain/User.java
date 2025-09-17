package com.project.backend.users.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "BINARY(16)", updatable = false, nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private LocalDate userBirthDate;

    private User(String userName, LocalDate userBirthDate) {
        this.userName = userName;
        this.userBirthDate = userBirthDate;
    }

    public static User createUser(String userName, LocalDate userBirthDate) {
        return new User(userName, userBirthDate);
    }
}
