package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartyDto {
	
	private String memberNo;
	private String name;            // 참여자 이름 (회원 이름 또는 회사 대표자 이름)
    private String role;            // 역할 (예: "갑", "을", "판매자")
    private boolean signed;         // 서명 여부 (true/false)
    private String signedDate;      // 서명 완료일 (예: "2025-07-15")
    private String signatureImage;  // 서명 이미지 데이터 (Base64 인코딩된 문자열 또는 파일 경로)

}
