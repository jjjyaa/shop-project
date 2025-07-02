package com.example.minishop.controller;

import com.example.minishop.dto.member.*;
import com.example.minishop.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<MemberSignupResponseDto> signup(@RequestBody MemberSignupRequestDto requestDto) {
        MemberSignupResponseDto responseDto = memberService.signup(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponseDto> login(@RequestBody MemberLoginRequestDto requestDto) {
        MemberLoginResponseDto responseDto = memberService.login(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 회원 정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<MemberSignupResponseDto> getMemberById(@PathVariable Long id) {
        MemberSignupResponseDto member = memberService.getMemberById(id);
        return ResponseEntity.ok(member);
    }

    // 회원 정보 수정
    @PatchMapping("/{id}")
    public ResponseEntity<MemberSignupResponseDto> updateMember(@PathVariable Long id,
                                                                @RequestBody MemberUpdateRequestDto requestDto) {
        MemberSignupResponseDto updated = memberService.updateMember(id, requestDto);
        return ResponseEntity.ok(updated);
    }

    // 회원 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

}
