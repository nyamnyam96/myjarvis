package kr.or.iei.company.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	

	@NoTokenCheck
	@GetMapping("/list")
	public HashMap<String, Object> companyMap(												
											  @RequestParam int reqPage, 
											  @RequestParam String sortKey, 
											  @RequestParam String sortDirection,
											  @RequestParam(defaultValue = "All") String type,
											  @RequestParam(defaultValue = "0") int status,
											  @RequestParam(defaultValue = "") String search											  
	) {		
		HashMap<String, Object> companyMap = companyService.selectCompanyList(reqPage, sortKey, sortDirection, type, status, search);		
		return companyMap;
	}
	
	@NoTokenCheck
	@PostMapping("/join")
	public int join(@RequestBody Company company) {
		int result = companyService.join(company);
		return result;
	}
	
	

}
