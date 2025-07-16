package kr.or.iei.contract.model.dto;

import java.util.List;

import kr.or.iei.common.model.dto.FileDTO;
import kr.or.iei.company.model.dto.Company;
import kr.or.iei.memo.model.dto.Memo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractDetailDto {	
	private Company companyInfo;      // 연결된 고객사 정보
    private ContractInfoDto contractInfo;    // 계약 기본 정보
    private List<PartyDto> parties;          // 전자계약 참여자 목록
    private List<FileDTO> attachedFiles;     // 첨부 파일 목록
    private List<HistoryDto> changeHistory;  // 변경 이력 목록
    private List<Memo> memos;             // 메모 목록
}
