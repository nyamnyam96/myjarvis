package kr.or.iei.contract.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.contract.model.dto.Contract;

@Mapper
public interface ContractDao {

	List<Contract> selectContractList();

}
