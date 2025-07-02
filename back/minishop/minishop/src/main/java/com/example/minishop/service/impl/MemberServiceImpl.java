package com.example.minishop.service.impl;

import com.example.minishop.dto.member.*;
import com.example.minishop.entity.Member;
import com.example.minishop.repository.MemberRepository;
import com.example.minishop.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @Override
    public MemberSignupResponseDto signup(MemberSignupRequestDto requestDto) {
        memberRepository.findByEmail(requestDto.getEmail())
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
                });

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(requestDto.getPassword());

        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(encryptedPassword)  // 암호화된 비밀번호 저장
                .name(requestDto.getName())
                .build();

        Member savedMember = memberRepository.save(member);

        return new MemberSignupResponseDto(
                savedMember.getId(),
                savedMember.getEmail(),
                savedMember.getName()
        );
    }

    // 로그인
    @Override
    public MemberLoginResponseDto login(MemberLoginRequestDto requestDto) {
        Member member = memberRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일이 존재하지 않습니다."));

        // BCrypt 검증
        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return new MemberLoginResponseDto(
                member.getId(),
                member.getEmail(),
                member.getName()
        );
    }

    // 회원 정보 조회
    @Override
    public MemberSignupResponseDto getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        return new MemberSignupResponseDto(
                member.getId(),
                member.getEmail(),
                member.getName()
        );
    }

    // 회원 정보 수정
    @Override
    public MemberSignupResponseDto updateMember(Long id, MemberUpdateRequestDto requestDto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        // 수정 필드 적용
        member.setName(requestDto.getName());

        if (requestDto.getPassword() != null && !requestDto.getPassword().isBlank()) {
            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
            member.setPassword(encodedPassword);
        }

        // 저장
        Member updated = memberRepository.save(member);

        return new MemberSignupResponseDto(updated.getId(), updated.getEmail(), updated.getName());
    }

    // 회원 탈퇴
    @Override
    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        memberRepository.delete(member);
    }
}
