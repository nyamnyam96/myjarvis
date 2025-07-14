package kr.or.iei.contract.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.common.model.dto.PageInfo;
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
    public int insertContract(Contract contract) {
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
        }
        return result;
    }
	
	

}
