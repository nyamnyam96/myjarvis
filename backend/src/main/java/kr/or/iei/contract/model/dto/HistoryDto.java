package kr.or.iei.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryDto {
	
	private int historyNo;        // 이력 번호 (PK)
    private String changedItem;   // 변경된 항목 (예: "계약 상태", "계약 금액")
    private String before;        // 변경 전 내용
    private String after;         // 변경 후 내용
    private String changeDate;    // 변경일
    private String changer;       // 변경한 사람의 이름

}
