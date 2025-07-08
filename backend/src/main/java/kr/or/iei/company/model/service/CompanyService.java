package kr.or.iei.company.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	

	public HashMap<String, Object> selectCompanyList(int reqPage, String sortKey, String sortDirection) {
		
		int viewCnt = 10; //한 페이지당 게시글 수
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = companyDao.selectCompanyCount(); //전체 고객사 수
		
		//페이징 정보
		PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
		
		//DAO에 전달할 모든 정보를 HashMap 담기
	    HashMap<String, Object> params = new HashMap<>();
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
	
	

}
