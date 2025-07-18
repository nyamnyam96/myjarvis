package kr.or.iei.company.controller;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import jakarta.annotation.PostConstruct;
import kr.or.iei.common.annotation.NoTokenCheck;
import kr.or.iei.company.model.dto.Company;
import kr.or.iei.company.model.dto.CompanyMember;
import kr.or.iei.company.model.service.CompanyService;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	// [디버깅용 코드] 서버 시작 시 모든 API 경로를 콘솔에 출력
    @Autowired
    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    @PostConstruct
    public void printAllMappings() {
        System.out.println("----- [CompanyController] 등록된 API 목록 -----");
        requestMappingHandlerMapping.getHandlerMethods().forEach((info, method) -> {
            String controllerName = method.getBeanType().getSimpleName();
            if (controllerName.equals("CompanyController")) {
                System.out.println(method.getMethod().getName() + " -> " + info.getDirectPaths() + " " + info.getMethodsCondition());
            }
        });
        System.out.println("-------------------------------------------");
    }
    // [디버깅용 코드 끝]

	@NoTokenCheck
	@GetMapping("/list")
	public HashMap<String, Object> companyMap(												
											  @RequestParam int reqPage, 
											  @RequestParam String sortKey, 
											  @RequestParam String sortDirection,
											  @RequestParam(defaultValue = "All") String type,
											  @RequestParam(defaultValue = "0") int status,
											  @RequestParam(defaultValue = "") String search,
											  @RequestParam String memberId
	) {		
		HashMap<String, Object> companyMap = companyService.selectCompanyList(reqPage, sortKey, sortDirection, type, status, search, memberId);		
		return companyMap;
	}	
	
	@NoTokenCheck
	@PostMapping("/join")
	public int join(@RequestBody Company company) { 	
		
		//memberNo가 채워진 company 객체로 서비스 로직 호출
		int result = companyService.join(company);
		return result;
	}
	
	@GetMapping("/search")
    @NoTokenCheck 
    public List<Company> searchCompany(@RequestParam String searchName, @RequestParam String memberId) {
        return companyService.searchCompanyByName(searchName, memberId);
    }
	
	// 담당자 목록 조회 API
	@NoTokenCheck
	@GetMapping("/{compCd}/members") 
	public ResponseEntity<List<CompanyMember>> getCompanyMembers(@PathVariable String compCd) {
	    List<CompanyMember> members = companyService.selectCompanyMembers(compCd);
	    return ResponseEntity.ok(members);
	}

	// 신규 담당자 추가 API
	@NoTokenCheck
	@PostMapping("/{compCd}/members") 
    public ResponseEntity<CompanyMember> insertCompanyMember(@RequestBody CompanyMember member) {
        
        CompanyMember newMember = companyService.insertCompanyMember(member);
        if (newMember != null) {	    	
            return ResponseEntity.ok(newMember);        }
        return ResponseEntity.badRequest().build();
    }
	
	@NoTokenCheck
    @GetMapping("/{compCd}")
    public HashMap<String, Object> selectOneCompany(@PathVariable String compCd) {
        return companyService.selectOneCompany(compCd);
    }

    @NoTokenCheck
    @PutMapping("/update")
    public int updateCompany(@RequestBody Company company) {
        return companyService.updateCompany(company);
    }
    
    @NoTokenCheck
    @DeleteMapping("/delete/{compCd}")
    public int deleteCompany(@PathVariable String compCd) {
        // 실제로는 trade_status를 2(거래중지)로 변경
        return companyService.deleteCompany(compCd);
    }
	
	
}
