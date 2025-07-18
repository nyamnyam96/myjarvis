package kr.or.iei.company.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.common.util.PageUtil;
import kr.or.iei.company.model.dao.CompanyDao;
import kr.or.iei.company.model.dto.Company;
import kr.or.iei.company.model.dto.CompanyMember;

@Service
public class CompanyService {
	
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private PageUtil pageUtil;
	/*
	public List<Company> selectCompanyList() {
		
		return companyDao.selectCompanyList();
	}
	*/
	

	public HashMap<String, Object> selectCompanyList(int reqPage, String sortKey, String sortDirection, String type, int status, String search, String memberId) {
		
		// 1. 필터 & 검색 값 해쉬맵에 담기
		HashMap<String, Object> params = new HashMap<>();		
		params.put("type", type); // 사업자 유형 선택 조회
        params.put("status", status); // 거래 상태 선택 조회
        params.put("search", search); // 검색 기능        
        params.put("memberId", memberId); //특정 로그인 유저의 고객사만 조회
		
		int totalCount = companyDao.selectCompanyCount(params); //전체 고객사 수
		
		//2. 페이징 처리에 필요한 값 설정 및 계산
		int viewCnt = 10; //한 페이지당 게시글 수
		int pageNaviSize = 5; //페이지 네비게이션 길이		
		//페이징 정보
		PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
		
		//3. 정렬 기능 정보 전달(해쉬맵 전달)    
	    params.put("pageInfo", pageInfo);
	    params.put("sortKey", sortKey);
	    params.put("sortDirection", sortDirection);  
		
		//고객사 목록
		ArrayList<Company> companyList = companyDao.selectCompanyList(params);
		
		HashMap<String, Object> companyMap = new HashMap<String, Object>();
		companyMap.put("companyList", companyList);
		companyMap.put("pageInfo", pageInfo);		
		
		return companyMap;
	}

	@Transactional
	public int join(Company company) {
		
		//1. 신규 고객사 정보 저장
		int result = companyDao.insertCompany(company);		
		
		//2. 담당자 목록 추가 여부 확인
		List<CompanyMember> members = company.getCompanyMembers();
		if(members != null && !members.isEmpty()) {
			
			//3. 담당자 목록을 하나씩 꺼내어 반복문으로 처리
			for(CompanyMember member : members) {								
				member.setCompCd(company.getCompCd()); // 방금 생성된 회사 코드(compCd)를 담당자 객체에 넣어줌.
			
				//4. 등록한 회원 정보도 담당자 객체에 전달
				member.setMemberNo(company.getMemberNo());
		    
				//5. 모든 정보가 채워진 담당자 정보를 TBL_COMPANY_MEMBER에 저장
				result += companyDao.insertCompanyMember(member); //회사 정보는 1개이고, 담당자 정보는 1개 이상일 수 있어 += 연산자 삽입.			
				
			}
		}		
		return result;
	}
	

	public List<Company> searchCompanyByName(String searchName, String memberId) {
		return companyDao.searchCompanyByName(searchName, memberId);
	}	
	
	// 담당자 목록 조회 서비스
	public List<CompanyMember> selectCompanyMembers(String compCd) {
		return companyDao.selectCompanyMembers(compCd);
	}
	
	// 외부 API용 담당자 추가 서비스 (객체 반환)
	@Transactional
    public CompanyMember insertCompanyMember(CompanyMember member) {        
        int result = companyDao.insertCompanyMember(member);
        if (result > 0) {
            return member;
        }
        return null;
    }

	public HashMap<String, Object> selectOneCompany(String compCd) {
		Company company = companyDao.selectOneCompany(compCd);
        List<CompanyMember> companyMembers = companyDao.selectCompanyMembers(compCd);

        HashMap<String, Object> map = new HashMap<>();
        map.put("company", company);
        map.put("companyMembers", companyMembers);
        return map;		
	}
	
	@Transactional
	public int updateCompany(Company company) {
		// 1. 회사 기본 정보 수정
        int result = companyDao.updateCompany(company);

        // 2. 기존 담당자 정보 모두 삭제
        companyDao.deleteCompanyMembers(company.getCompCd());

        // 3. 화면에서 전달된 담당자 정보 다시 삽입
        List<CompanyMember> members = company.getCompanyMembers();
        if(members != null && !members.isEmpty()) {
            for(CompanyMember member : members) {
                member.setCompCd(company.getCompCd());
                member.setMemberNo(company.getMemberNo()); // 담당자를 등록/수정한 회원의 번호
                companyDao.insertCompanyMember(member);
            }
        }
        return result;
	}

	public int deleteCompany(String compCd) {
		// trade_status를 2(거래중지)로 업데이트
        return companyDao.deactivateCompany(compCd);
		
	}
	
	

}
