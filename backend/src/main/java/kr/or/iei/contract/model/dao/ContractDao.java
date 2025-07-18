package kr.or.iei.contract.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.or.iei.common.model.dto.FileDTO;
import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractDetailDto;
import kr.or.iei.contract.model.dto.ContractParty;
import kr.or.iei.contract.model.dto.HistoryDto;
import kr.or.iei.contract.model.dto.PartyDto;
import kr.or.iei.contract.model.dto.SignatureUpdateDto;
import kr.or.iei.memo.model.dto.Memo;

@Mapper
public interface ContractDao {

	int selectContractCount(HashMap<String, Object> params);

	ArrayList<Contract> selectContractList(HashMap<String, Object> params);

	int updateContractStatus(String contractNo, String statusCode);

	int insertContractHistory(String contractNo, String contractHistoryContent, String memberNo);

	ArrayList<Contract> selectAllContractList(HashMap<String, Object> params);

	int insertContract(Contract contract);

	int insertContractParty(ContractParty party);
	
	// 1. 메인 쿼리 : 계약 및 고객사 기본 정보 조회
	ContractDetailDto selectOneContract(String contractNo);
	
	// 2. 서브 쿼리: 특정 계약의 참여자 목록 조회
    List<PartyDto> selectContractParties(String contractNo);
    
    // 3. 서브 쿼리: 특정 계약의 첨부파일 목록 조회
    List<FileDTO> selectContractFiles(String contractNo);
    
    // 4. 서브 쿼리: 특정 계약의 변경 이력 조회
    List<HistoryDto> selectContractHistory(String contractNo);
    
    // 5. 서브 쿼리: 특정 계약의 메모 목록 조회
    List<Memo> selectContractMemos(String contractNo);

	int updateSignature(SignatureUpdateDto signatureDto);

	ContractDetailDto selectContractByToken(String signToken);

	int updateSignatureByToken(SignatureUpdateDto signatureDto);

	int updateSignToken(@Param("signToken") String signToken, @Param("contractNo") String contractNo, @Param("memberNo") String recipientMemberNo);

	String getMemberNoBySignToken(String signToken);

	String getContractNoBySignToken(String signToken);
	
	String getMemberNoByContractNo(String contractNo);

	List<Contract> selectContractListByCompany(String compCd);

}
