package kr.or.iei.contract.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.common.util.PageUtil;
import kr.or.iei.contract.model.dao.ContractDao;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractStatusUpdateDTO;

@Service
public class ContractService {
	
	@Autowired
	private ContractDao contractDao;
	
	@Autowired
	private PageUtil pageUtil;	
	
	public HashMap<String, Object> selectContractList(int reqPage) {
		
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
	}

	public int updateContractStatus(String contractNo, ContractStatusUpdateDTO dto) {
		
		//계약 상태 업데이트
		int result = contractDao.updateContractStatus(contractNo, dto.getStatusCode());
		
		//상태 변경 시, 히스토리 업데이트
		if (result > 0) {
			result += contractDao.insertContractHistory(contractNo, dto.getContractHistoryContent(), dto.getMemberNo());
		}		
		
		return result;
	}
	
	

}
