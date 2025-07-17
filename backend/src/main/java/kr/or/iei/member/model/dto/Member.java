package kr.or.iei.member.model.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Member implements UserDetails { // ◀ 1. UserDetails 인터페이스 구현

    // --- 기존 필드는 그대로 ---
    private String memberNo;
    private String memberId;
    private String memberPw;
    private String memberName;
    private char memberStatus;
    private String memberEmail;
    private String memberPhone;
    private String joinDate;
    private String memberCompName;
    private String memberCompNo;

    // 👇 [핵심] 2. UserDetails 인터페이스의 약속된 메소드들을 구현합니다.

    // 사용자의 '권한'을 반환하는 메소드
    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        // memberStatus 값에 따라 권한 부여 (A: 관리자, Y: 일반회원)
        // "ROLE_" 접두사는 Spring Security의 규칙입니다.
        if(memberStatus == 'A') {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
        }
        return authorities;
    }

    // 비밀번호를 반환하는 메소드
    @Override
    public String getPassword() {
        return memberPw;
    }

    // 아이디를 반환하는 메소드
    @Override
    public String getUsername() {
        return memberId;
    }

    // 아래 4개는 계정 상태 관련 메소드입니다. (ex. 계정 만료, 잠김 등)
    // 지금은 모두 true로 설정하여 항상 활성화된 상태로 둡니다.
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}