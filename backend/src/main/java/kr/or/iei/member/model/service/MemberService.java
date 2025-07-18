package kr.or.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.common.util.JwtUtils;
import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.LoginMember;
import kr.or.iei.member.model.dto.Member;

@Service
public class MemberService implements UserDetailsService {

	@Autowired
	private MemberDao dao;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private JwtUtils jwtUtils;

	//아이디 검증체크
	public int chkMemberId(String memberId) {
		return dao.chkMemberId(memberId);
	}

	
	//회원가입 및 비밀번호 암호화
	@Transactional
	public int insertMember(Member member) {
		String encodePw = encoder.encode(member.getMemberPw()); //암호화 
		member.setMemberPw(encodePw);
		return dao.insertMember(member);
	}


	public LoginMember memberLogin(Member member) {
		Member chkMember = dao.memberLogin(member.getMemberId());
		
		//아이디 잘못 입력하여, chkMember가 null인 경우 
		if(chkMember == null) {
			
			return null;
		}
		
		if(encoder.matches(member.getMemberPw(), chkMember.getMemberPw())) {
			//엄호화 비밀번호 일치한 경우
			String accessToken = jwtUtils.createAccessToken(chkMember.getMemberId(), String.valueOf(chkMember.getMemberStatus()));
			String refreshToken = jwtUtils.createRefreshToken(chkMember.getMemberId(), String.valueOf(chkMember.getMemberStatus()));
		
			
			//스토리지에 저장되지 않도록 처리
			chkMember.setMemberPw(null);
			
			LoginMember loginMember = new LoginMember(chkMember, accessToken, refreshToken);
			
			return loginMember;
		}else {
			//평문 != 암호화 비밀번호(일지차히 않은 경우)
			return null;
		}
	}

	//회원 정보 조회
	public Member selectOneMember(String memberId) {
		
		Member member = dao.selectOneMember(memberId);
		member.setMemberPw(null);
		return member;
	}


	//회원 삭제
	@Transactional
	public int deleteMember(String memberId) {
		
		return dao.deleteMember(memberId);
	}

	//회원 정보 수정
	@Transactional
	public int updateMember(Member member) {
		String encodePw = encoder.encode(member.getMemberPw());
		member.setMemberPw(encodePw);
		return dao.updateMember(member);
		
	}

	//회원 정보 수정 전 비밀번호 체크
	public boolean checkPw(Member member) {
		//아이디로 회원 정보 조회
		Member chkMember = dao.selectOneMember(member.getMemberId());
		
		if(chkMember == null) {
			return false;			
		}else {
			//조회된 경우, 사용자가 입력한 기존 비밀번호와 DB에 비밀번호 일치성 검증 결과 리턴
			boolean result = encoder.matches(member.getMemberPw(), chkMember.getMemberPw());
			return result;
		}
	}


	public String refreshToken(Member member) {
		//refreshToken 검증 통과 -> accessToken 재발급 처리 (성공)
		String accessToken = jwtUtils.createAccessToken(member.getMemberId(), String.valueOf(member.getMemberStatus()));
		return accessToken;
	}


	

	public int chkMemberEmail(String memberEmail) {
		return dao.chkMemberEmail(memberEmail);
	}
	
	@Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        // 전달받은 memberId를 이용해 DB에서 회원 정보를 조회
        Member member = dao.memberLogin(memberId);
        if (member == null) {
            // 조회된 회원이 없으면, Spring Security에 에러를 발생시킴
            throw new UsernameNotFoundException("회원을 찾을 수 없습니다.");
        }
        // 조회된 회원 정보(UserDetails 타입)를 반환
        return member;
    }

	

	
	
}
