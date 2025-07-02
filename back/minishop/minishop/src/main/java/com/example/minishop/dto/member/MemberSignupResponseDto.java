package com.example.minishop.dto.member;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignupResponseDto {

    private Long id;
    private String email;
    private String name;

}
