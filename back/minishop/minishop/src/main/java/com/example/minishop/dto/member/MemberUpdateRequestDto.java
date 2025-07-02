package com.example.minishop.dto.member;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequestDto {
    private String name;
    private String password;  // 새 비밀번호
}
