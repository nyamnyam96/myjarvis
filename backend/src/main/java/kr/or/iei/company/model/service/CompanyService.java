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
	

	public HashMap<String, Object> selectCompanyList(int reqPage, String sortKey, String sortDirection, String type, int status, String search) {
		
		// 1. 필터 & 검색 값 해쉬맵에 담기
		HashMap<String, Object> params = new HashMap<>();		
		params.put("type", type); // 사업자 유형 선택 조회
        params.put("status", status); // 거래 상태 선택 조회
        params.put("search", search); // 검색 기능
		
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
		return companyDao.insertCompany(company);
	}
	
	

}
