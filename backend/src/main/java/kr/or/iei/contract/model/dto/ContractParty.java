package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContractParty {
	
	private long id;
    private String contractNo;
    private String compCd;
    private String memberNo;
    private String role;
    private String contactIdx;

}
