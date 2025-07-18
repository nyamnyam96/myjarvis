package kr.or.iei.invoice.model.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.common.util.PageUtil;
import kr.or.iei.invoice.model.dao.InvoiceDao;
import kr.or.iei.invoice.model.dto.Invoice;

@Service
public class InvoiceService {
	
	@Autowired
	private InvoiceDao invoiceDao;
	
	@Autowired
	private PageUtil pageUtil;
	
	//청구 전체 조회
	public HashMap<String, Object> selectInvoiceList(int reqPage, String sortKey, String sortDirection, String status,
			String search, String memberId) {
		
		// 1. 필터 & 검색 값 해쉬맵에 담기
		HashMap<String, Object> params = new HashMap<>();		
        params.put("status", status); // 청구 상태 선택 조회
        params.put("search", search); // 검색 기능        
        params.put("memberId", memberId); //특정 로그인 유저의 고객사만 조회
		
		int totalCount = invoiceDao.selectInvoiceCount(params); //전체 청구 수
		
		//2. 페이징 처리에 필요한 값 설정 및 계산
		int viewCnt = 10; //한 페이지당 게시글 수
		int pageNaviSize = 5; //페이지 네비게이션 길이		
		//페이징 정보
		PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
		
		//3. 정렬 기능 정보 전달(해쉬맵 전달)    
	    params.put("pageInfo", pageInfo);
	    params.put("sortKey", sortKey);
	    params.put("sortDirection", sortDirection);  
		
		//전체 청구 목록
		ArrayList<Invoice> invoiceList = invoiceDao.selectInvoiceList(params);
		
		HashMap<String, Object> invoiceMap = new HashMap<String, Object>();
		invoiceMap.put("invoiceList", invoiceList);
		invoiceMap.put("pageInfo", pageInfo);		
		
		return invoiceMap;	
	}

}
