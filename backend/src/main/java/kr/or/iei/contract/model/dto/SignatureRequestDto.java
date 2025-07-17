package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignatureRequestDto {
	
	private String recipientEmail;
    private String recipientName;
    private String recipientMemberNo;

}
