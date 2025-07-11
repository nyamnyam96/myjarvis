package kr.or.iei.contract.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.contract.model.dto.Contract;

@Mapper
public interface ContractDao {

	int selectContractCount();

	ArrayList<Contract> selectContractList(PageInfo pageInfo);

}
