package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ContractStatusUpdateDTO {
	
	private String statusCode;
	private String contractHistoryContent;
	private String memberNo;
}
