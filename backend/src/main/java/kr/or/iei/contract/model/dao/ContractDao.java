package kr.or.iei.contract.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractParty;

@Mapper
public interface ContractDao {

	int selectContractCount();

	ArrayList<Contract> selectContractList(PageInfo pageInfo);

	int updateContractStatus(String contractNo, String statusCode);

	int insertContractHistory(String contractNo, String contractHistoryContent, String memberNo);

	ArrayList<Contract> selectAllContractList();

	int insertContract(Contract contract);

	int insertContractParty(ContractParty party);

}
