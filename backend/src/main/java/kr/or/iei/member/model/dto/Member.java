package kr.or.iei.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class Member {

	//회원 정보
	private String memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberStatus;
	private String memberEmail;
	private String memberPhone;
}
