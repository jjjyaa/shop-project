package com.example.minishop.service;

import com.example.minishop.dto.member.*;

public interface MemberService {

    // 회원가입
    MemberSignupResponseDto signup(MemberSignupRequestDto requestDto);

    // 로그인
    MemberLoginResponseDto login(MemberLoginRequestDto requestDto);

    // 회원 정보 조회
    MemberSignupResponseDto getMemberById(Long id);

    // 회원 정보 수정
    MemberSignupResponseDto updateMember(Long id, MemberUpdateRequestDto requestDto);

    // 회원 탈퇴
    void deleteMember(Long id);
}
