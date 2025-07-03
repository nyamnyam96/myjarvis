package kr.or.iei.company.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.company.model.dao.CompanyDao;
import kr.or.iei.company.model.dto.Company;

@Service
public class CompanyService {
	
	@Autowired
	private CompanyDao companyDao;

	public List<Company> selectCompanyList() {
		
		return companyDao.selectCompanyList();
	}
	
	

}
