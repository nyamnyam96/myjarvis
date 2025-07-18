package kr.or.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.common.model.dto.ResponseDTO;
import kr.or.iei.member.model.dto.LoginMember;
import kr.or.iei.member.model.dto.Member;
import kr.or.iei.member.model.service.MemberService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/member")
public class MemberController {

	@Autowired
	private MemberService service;
	
	//아이디 중복 체크
	@GetMapping("/{memberId}/chkId")
	@NoTokenCheck
	public ResponseEntity<ResponseDTO> chkMemberId(@PathVariable String memberId){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "아이디 중복 체크 중, 오류가 발생하였습니다.", false, "error");
		
		try {
			int count = service.chkMemberId(memberId);
			
			res = new ResponseDTO(HttpStatus.OK, "", count, "success");
		}catch (Exception e) {
			e.printStackTrace();
		}
	
		
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	//회원 가입
	@PostMapping
	@NoTokenCheck
	public ResponseEntity<ResponseDTO> insertMember(@RequestBody Member member){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "회원 가입 중, 오류가 발생하였습니다.", false, "error");
		
		try {
			int result = service.insertMember(member);
			
			if(result > 0) {
				res = new ResponseDTO(HttpStatus.OK, "회원 가입 성공, 로그인 페이지로 이동합니다.", true, "success");
			}else {
				res = new ResponseDTO(HttpStatus.OK, "회원 가입 중 오류가 발생하였습니다.", false, "warning");
			}
			
			
		}catch (Exception e) {
			e.printStackTrace(); 
		}
		
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	//로그인
	@PostMapping("/login")
	@NoTokenCheck
	public ResponseEntity<ResponseDTO> memberLogin(@RequestBody Member member){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "로그인 중, 오류가 발생하였습니다", null, "error");
	
		try {
			LoginMember loginMember = service.memberLogin(member);
			
			if(loginMember == null) {
				res = new ResponseDTO(HttpStatus.OK, "아이디 및 비밀번호를 확인하세요", null, "warning");
			}else {
				res = new ResponseDTO(HttpStatus.OK, "", loginMember, "");
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	//마이페이지 회원정보
	@GetMapping("/{memberId}")
	public ResponseEntity<ResponseDTO> selectOneMember(@PathVariable String memberId){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "회원 정보 조회 중, 오류가 발생하였습니다. ", null, "error");
			
		try {
			
			Member member = service.selectOneMember(memberId);
			res = new ResponseDTO(HttpStatus.OK, "", member, "");
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	//회원탈퇴
	@DeleteMapping("/{memberId}")
	public ResponseEntity<ResponseDTO> deleteMember(@PathVariable String memberId){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "회원 탈퇴중 , 오류가 발생하였습니다.", false, "error");
		
		try {
			int result = service.deleteMember(memberId);
			
			if(result > 0) {
				res = new ResponseDTO(HttpStatus.OK, "회원 탈퇴가 정상 처리 되었습니다.", true, "success");
			}else {
				res = new ResponseDTO(HttpStatus.OK, "삭제 중, 오류가 발생하였습니다.", false, "warning");
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	
	//회원 정보 수정
	@PatchMapping
	public ResponseEntity<ResponseDTO> updateMember(@RequestBody Member member){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "회원 수정 중 , 오류가 발생하였습니다.", false, "error");
		
		try {
			int result = service.updateMember(member);
			
			if(result >0) {
				res = new ResponseDTO(HttpStatus.OK, "회원 정보 수정이 완료되었습니다.", true, "success");
			}else {
				//수정되지 않은 경우
				res = new ResponseDTO(HttpStatus.OK, "수정 중, 오류가 발생하였습니다.", false, "warning");
				
			}
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	//비밀번호 체크
	@PostMapping("/checkPw")
	public ResponseEntity<ResponseDTO> checkPw(@RequestBody Member member){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "기존 비밀번호 체크 중, 오류가 발생하였습니다.", false, "error");
		
		try {
			boolean result = service.checkPw(member);
			res = new ResponseDTO(HttpStatus.OK, "", result, "");
		}catch(Exception e) {
			e.printStackTrace();
		}
	
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	@GetMapping("/{memberEmail}/chkEmail")
	@NoTokenCheck
	public ResponseEntity<ResponseDTO> chkMemberEmail(@PathVariable String memberEmail){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 체크 실패", false, "error");
		 
		try {
			int count = service.chkMemberEmail(memberEmail);
			res = new ResponseDTO(HttpStatus.OK, "", count, "success");
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	
	@NoTokenCheck
	@PostMapping("/refresh")
	public ResponseEntity<ResponseDTO> refreshToken(@RequestBody Member member){
		ResponseDTO res = new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "토큰 재발급 실패", null, "error");
		
		try {
			String reAccessToken = service.refreshToken(member);
			
			res = new ResponseDTO(HttpStatus.OK, "", reAccessToken, "");
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<ResponseDTO>(res, res.getHttpStatus());
	}
	
	
}
