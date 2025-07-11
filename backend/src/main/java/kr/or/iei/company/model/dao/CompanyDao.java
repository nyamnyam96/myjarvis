package kr.or.iei.company.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.company.model.dto.Company;

@Mapper
public interface CompanyDao {
	
	
	//List<Company> selectCompanyList();

	int selectCompanyCount(HashMap<String, Object> params);

	ArrayList<Company> selectCompanyList(HashMap<String, Object> params);

	int join(Company company);

}
