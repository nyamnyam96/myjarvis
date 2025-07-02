package kr.or.iei.company.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.company.model.dto.Company;

@Mapper
public interface CompanyDao {

	List<Company> selectCompanyList();

}
