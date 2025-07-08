package kr.or.iei.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginMember {

	//로그인 했을시 토큰
	private Member member;
	private String accessToken;
	private String refreshToken;
}
