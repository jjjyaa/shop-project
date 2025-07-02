package com.example.minishop.dto.member;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberLoginRequestDto {
    private String email;
    private String password;
}