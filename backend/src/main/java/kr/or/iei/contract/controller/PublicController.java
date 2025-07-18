package kr.or.iei.contract.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.contract.model.dto.ContractDetailDto;
import kr.or.iei.contract.model.dto.SignatureUpdateDto;
import kr.or.iei.contract.model.service.ContractService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/public") // 이 컨트롤러의 모든 API는 /public으로 시작합니다.
@RequiredArgsConstructor
public class PublicController {
	private final ContractService contractService;

    // 최종 API 경로: GET /public/contract/{signToken}
    @NoTokenCheck
    @GetMapping("/contract/{signToken}")
    public ResponseEntity<ContractDetailDto> getPublicContract(@PathVariable String signToken) {
        ContractDetailDto contractDetail = contractService.selectContractByToken(signToken);
        if (contractDetail != null) {
            return ResponseEntity.ok(contractDetail);
        }
        return ResponseEntity.notFound().build();
    }

    // 최종 API 경로: POST /public/sign/{signToken}
    @NoTokenCheck
    @PostMapping("/sign/{signToken}")
    public ResponseEntity<Void> savePublicSignature(@PathVariable String signToken, @RequestBody SignatureUpdateDto signatureDto) {
        signatureDto.setSignToken(signToken);
        int result = contractService.updateSignatureByToken(signatureDto);
        if (result > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
