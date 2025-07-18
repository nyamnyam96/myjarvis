package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignatureUpdateDto {
	
	private String contractNo;
	private String partyId; // 누가 서명했는지 식별
    private String signatureImage; // Base64 인코딩된 이미지 데이터
    private String signToken;

}
