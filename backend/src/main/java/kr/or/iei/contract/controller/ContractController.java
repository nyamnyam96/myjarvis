package kr.or.iei.contract.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractStatusUpdateDTO;
import kr.or.iei.contract.model.service.ContractService;

@RestController
@CrossOrigin("*")		          
@RequestMapping("/contract")
public class ContractController {

	@Autowired
	private ContractService contractService;
	
	@NoTokenCheck
	@GetMapping("/list")
	public HashMap<String, Object> contractMap(@RequestParam int reqPage) {
		
		HashMap<String, Object> contractMap = contractService.selectContractList(reqPage);		
		return contractMap; 
	}
	
	@PatchMapping("/{contractNo}/status")
	public int updateContractStatus(@PathVariable String contractNo, @RequestBody ContractStatusUpdateDTO dto) {
		
		return contractService.updateContractStatus(contractNo, dto);
	}
	
	
}
