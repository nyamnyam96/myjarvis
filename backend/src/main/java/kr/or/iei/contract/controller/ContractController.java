package kr.or.iei.contract.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.service.ContractService;

@RestController
@CrossOrigin("*")
@RequestMapping("/contract")
public class ContractController {

	@Autowired
	private ContractService contractService;
	
	@GetMapping("/list")
	public List<Contract> selectContractList() {
		
		return contractService.selectContractList();
	}
	
}
