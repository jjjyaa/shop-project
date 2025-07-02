package com.example.minishop.dto.member;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignupRequestDto {

    private String email;
    private String password;
    private String name;

}
