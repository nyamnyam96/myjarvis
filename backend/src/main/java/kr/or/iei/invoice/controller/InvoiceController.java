package kr.or.iei.invoice.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.invoice.model.service.InvoiceService;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {
	
	@Autowired
	private InvoiceService invoiceService;
	
	@NoTokenCheck
	@GetMapping("/list")
	public HashMap<String, Object> invoiceMap(@RequestParam int reqPage,
											  @RequestParam String memberId,
											  @RequestParam String sortKey,
											  @RequestParam String sortDirection,
											  @RequestParam(defaultValue = "") String search,
											  @RequestParam(defaultValue = "All") String status) {
		
		HashMap<String, Object> invoiceMap = invoiceService.selectInvoiceList(reqPage, sortKey, sortDirection, status, search, memberId);		
		return invoiceMap;		
	}

}
