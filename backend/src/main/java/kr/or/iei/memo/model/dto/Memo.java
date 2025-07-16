package kr.or.iei.memo.model.dto;

import kr.or.iei.contract.model.dto.ContractInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Memo {
	
	private String memoNo;          // 메모 고유번호 (PK)
    private String memberNo;        // 작성한 회원 고유번호 (FK)
    private String memoTable;       // 메모가 달린 테이블 종류 (예: "contract")
    private String memoId;          // 해당 테이블의 고유 ID (예: 계약번호 "123")
    private String memoContent;     // 메모 내용
    private String regDate;         // 등록일 (YYYY-MM-DD 형식의 문자열로 받는 것이 편리)
    private String reviseDate;      // 수정일

    // 화면 표시에 필요한 추가 정보 (JOIN 쿼리를 통해 채울 수 있음)
    private String writerName;      // 작성자 이름
	
	
}
