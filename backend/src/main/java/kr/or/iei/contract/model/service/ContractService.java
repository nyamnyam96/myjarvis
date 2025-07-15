package kr.or.iei.contract.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.common.model.dao.FileDao;
import kr.or.iei.common.model.dto.FileDTO;
import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.common.util.FileUtils;
import kr.or.iei.common.util.PageUtil;
import kr.or.iei.contract.model.dao.ContractDao;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractParty;
import kr.or.iei.contract.model.dto.ContractStatusUpdateDTO;

@Service
public class ContractService {
	
	@Autowired
	private ContractDao contractDao;
	
	@Autowired
	private PageUtil pageUtil;	
	
	@Autowired
	private FileUtils fileUtils;
	
	@Autowired
	private FileDao fileDao;
	
	public HashMap<String, Object> selectContractList(int reqPage) {
		
		HashMap<String, Object> contractMap = new HashMap<>();

        //reqPage가 0이면 페이지네이션 없이 전체 목록을 조회
        if (reqPage == 0) {
            ArrayList<Contract> contractList = contractDao.selectAllContractList();
            contractMap.put("contractList", contractList);
          
        } else {
            
            int viewCnt = 10;
            int pageNaviSize = 5;
            int totalCount = contractDao.selectContractCount();
            
            //페이징 정보
            PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
            //계약 목록
            ArrayList<Contract> contractList = contractDao.selectContractList(pageInfo);
            
            contractMap.put("contractList", contractList);
            contractMap.put("pageInfo", pageInfo);
        }
        return contractMap;
		
		/*
		int viewCnt = 10; //한페이지당 게시글 수
		int pageNaviSize = 5; //페이지 네비 길이
		int totalCount = contractDao.selectContractCount(); //전체 게시글 수
		
		//페이징 정보
		PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
		
		//계약 목록
		ArrayList<Contract> contractList = contractDao.selectContractList(pageInfo);
		
		HashMap<String, Object> contractMap = new HashMap<String, Object>();
		contractMap.put("contractList", contractList);
		contractMap.put("pageInfo", pageInfo);		
		 
		return contractMap;
		*/
	}
	
	@Transactional
	public int updateContractStatus(String contractNo, ContractStatusUpdateDTO dto) {
		
		//계약 상태 업데이트
		int result = contractDao.updateContractStatus(contractNo, dto.getStatusCode());
		
		//상태 변경 시, 히스토리 업데이트
		if (result > 0) {
			result += contractDao.insertContractHistory(contractNo, dto.getContractHistoryContent(), dto.getMemberNo());
		}		
		
		return result;
	}

	@Transactional
    public int insertContract(Contract contract, List<MultipartFile> files) {
        // 1. TBL_CONTRACT에 먼저 계약 데이터를 저장        
        int result = contractDao.insertContract(contract);

        if (result > 0) {
            // 2. 계약 추가 정보가 있다면 TBL_CONTRACT_PARTY에 추가로 저장               
            List<ContractParty> partyList = contract.getPartyList(); // DTO에 getPartyList 추가 필요
            if (partyList != null && !partyList.isEmpty()) {
                for (ContractParty party : partyList) {
                    // 3. 방금 생성된 contractNo를 각 party 객체에 설정합니다.
                    party.setContractNo(contract.getContractNo());
                    result += contractDao.insertContractParty(party);
                }
            }
            
            // 3. 파일 업로드 로직           
            if (files != null) {
                for (MultipartFile file : files) {
                	if(file.isEmpty()) continue; // 파일이 비어있으면 건너뛰기
                	
                	// 3. 파일을 서버에 저장하고, 저장된 파일 정보 DTO를 받음
                    FileDTO fileDto = fileUtils.upload(file);
                    
                    // 4. DTO에 추가 정보 설정
                    fileDto.setFileTable("contract"); // 이 파일이 어느 테이블과 연관되었는지
                    fileDto.setFileId(contract.getContractNo()); // 그 테이블의 어떤 데이터와 연관되었는지 (PK)
                    fileDto.setMemberNo(contract.getMemberNo()); // 누가 올렸는지
                    
                    // 5. 파일 정보를 TBL_FILE에 최종 INSERT
                    result += fileDao.insertFile(fileDto);
                }
            }
        }
        return result;
    }
	
	

}
