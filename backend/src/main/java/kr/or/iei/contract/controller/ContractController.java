package kr.or.iei.contract.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.contract.model.dto.AiReviewRequest;
import kr.or.iei.contract.model.dto.AiReviewResponse;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractDetailDto;
import kr.or.iei.contract.model.dto.ContractStatusUpdateDTO;
import kr.or.iei.contract.model.dto.SignatureRequestDto;
import kr.or.iei.contract.model.dto.SignatureUpdateDto;
import kr.or.iei.contract.model.service.ContractService;

@RestController	          
@RequestMapping("/contract")
public class ContractController {

	@Autowired
	private ContractService contractService;
	
	
	@NoTokenCheck
	@GetMapping("/list")
	public HashMap<String, Object> contractMap(@RequestParam(required = false) Integer reqPage, @RequestParam(required = false) String memberNo) {		
		int page = (reqPage == null) ? 0 : reqPage;
        return contractService.selectContractList(page, memberNo);
	}
	
	@PatchMapping("/{contractNo}/status")
	public int updateContractStatus(@PathVariable String contractNo, @RequestBody ContractStatusUpdateDTO dto) {		
		return contractService.updateContractStatus(contractNo, dto);
	}
	
	//신규 계약 추가
	@NoTokenCheck 
    @PostMapping
    public int insertContract(@RequestPart Contract contract, @RequestPart(value="files", required = false) List<MultipartFile> files) {        
        return contractService.insertContract(contract, files);
    }
    
    //계약서 AI 검토 기능
    @PostMapping("/ai-review")
    @NoTokenCheck 
    public AiReviewResponse getAiReview(@RequestBody AiReviewRequest request) {
        return contractService.getAiReview(request.getContent());
    }
    
    //계약서 상세 조회  
    @NoTokenCheck
    @GetMapping("/{contractNo}")
    public ResponseEntity<ContractDetailDto> selectOneContract(@PathVariable String contractNo) {
        ContractDetailDto contractDetail = contractService.selectOneContract(contractNo);
        if (contractDetail != null) {
            return ResponseEntity.ok(contractDetail);
        }
        return ResponseEntity.notFound().build();
    }
    
    //서명하기
    @PostMapping("/{contractNo}/signature")
    public ResponseEntity<Void> updateSignature(@PathVariable String contractNo, @RequestBody SignatureUpdateDto signatureDto) {
        signatureDto.setContractNo(contractNo);
        int result = contractService.updateSignature(signatureDto);
        if(result > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
    
    //서명 요청 이메일 발송
    @PostMapping("/{contractNo}/send-request")
    public ResponseEntity<Void> sendSignatureRequest(@PathVariable String contractNo, @RequestBody SignatureRequestDto req ) {
        
    	// 서비스에 DTO 객체 전체를 전달
        contractService.sendSignatureRequestEmail(contractNo, req);
        return ResponseEntity.ok().build();
    }
    
    //고객사 상세 페이지 > 계약 목록 조회
    @GetMapping("/company/{compCd}")
    public List<Contract> getContractListByCompany(@PathVariable String compCd) {
        return contractService.selectContractListByCompany(compCd);
    }
            
	
}
