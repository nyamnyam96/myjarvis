package kr.or.iei.contract.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Contract {
	private String contractNo;      // 계약번호 (PK)
	private String memberNo;        // 담당회원번호
    private String statusCode;      // 상태코드 ('W', 'C', 'X', 'T')(대기,확정,취소,임시저장)
    private String contractTitle;   // 계약명
    private String contractContent; // 계약내용
    private String contractStart;   // 계약시작일
    private String contractEnd;     // 계약종료일
    private long contractDeposit;   // 계약금액
    private String contractConfirm; // 계약확정일 
    private String regDate;			// 계약등록일	
    
    // JOIN을 통해 가져올 추가 정보
    private String memberName;      // 담당자 이름
    private String companyName;     // 고객사 이름	
    
    private List<ContractParty> partyList; //신규 계약 시 partyList에 추가
}
