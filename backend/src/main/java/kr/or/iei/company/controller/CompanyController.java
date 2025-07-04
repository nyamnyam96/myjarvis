package kr.or.iei.company.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.company.model.dto.Company;
import kr.or.iei.company.model.service.CompanyService;

@RestController
@CrossOrigin("*")
@RequestMapping("/company")
public class CompanyController {
	
	@Autowired
	private CompanyService companyService;
	
	/*
	
	@NoTokenCheck
	@GetMapping("/list")
	public List<Company> companyList() {
		return companyService.selectCompanyList();
	}
	
	*/
	
	@NoTokenCheck
	@GetMapping("/list")
	public HashMap<String, Object> companyMap(@RequestParam int reqPage, @RequestParam String sortKey, @RequestParam String sortDirection) {
		HashMap<String, Object> companyMap = companyService.selectCompanyList(reqPage, sortKey, sortDirection);
		return companyMap;
	}	

}
