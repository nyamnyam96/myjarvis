package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractInfoDto {	
	private String contractNo;
    private String contractTitle;
    private String contractContent;
    private String contractStart;
    private String contractEnd;
    private long contractDeposit;
    private String statusCode;

}
