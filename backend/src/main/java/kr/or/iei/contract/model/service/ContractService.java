package kr.or.iei.contract.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.common.util.PageUtil;
import kr.or.iei.contract.model.dao.ContractDao;
import kr.or.iei.contract.model.dto.Contract;

@Service
public class ContractService {
	
	@Autowired
	private ContractDao contractDao;
	
	@Autowired
	private PageUtil pageUtil;

	public List<Contract> selectContractList() {
		
		return contractDao.selectContractList();
	}

}
