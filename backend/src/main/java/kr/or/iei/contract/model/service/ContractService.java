package kr.or.iei.contract.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.iei.common.model.dao.FileDao;
import kr.or.iei.common.model.dto.FileDTO;
import kr.or.iei.common.model.dto.PageInfo;
import kr.or.iei.common.util.FileUtils;
import kr.or.iei.common.util.PageUtil;
import kr.or.iei.contract.model.dao.ContractDao;
import kr.or.iei.contract.model.dto.AiReviewResponse;
import kr.or.iei.contract.model.dto.Content;
import kr.or.iei.contract.model.dto.Contract;
import kr.or.iei.contract.model.dto.ContractDetailDto;
import kr.or.iei.contract.model.dto.ContractParty;
import kr.or.iei.contract.model.dto.ContractStatusUpdateDTO;
import kr.or.iei.contract.model.dto.GeminiRequest;
import kr.or.iei.contract.model.dto.GeminiResponse;
import kr.or.iei.contract.model.dto.Part;
import kr.or.iei.contract.model.dto.SignatureUpdateDto;

@Service
public class ContractService {
	
	@Autowired
	private ContractDao contractDao;
	
	@Autowired
	private PageUtil pageUtil;	
	
	@Autowired
	private FileUtils fileUtils;
	
	@Autowired
	private FileDao fileDao;
	
    @Value("${gemini.api.url}")
    private String apiUrl;
    @Value("${gemini.api.key}")
    private String apiKey;
    
    //계약서 AI 검토기능
    public AiReviewResponse getAiReview(String contractContent) {
        // 1. AI에게 역할을 부여하는 프롬프트(지시문) 작성
        String prompt = "당신은 숙련된 계약 검토 전문 변호사입니다. 다음 계약서 내용의 문제점을 분석해주세요. "
            + "반드시 아래와 같은 JSON 형식으로만 답변해야 합니다: "
            + "{\"summary\": \"계약서 핵심 요약\", \"pros\": [\"유리한 조항1\", \"유리한 조항2\"], \"cons\": [\"불리한/독소 조항1\", \"불리한/독소 조항2\"]} "
            + "만약 분석할 내용이 없다면, 모든 필드를 빈 값으로 채워서 응답하세요. \n\n"
            + "--- 계약서 내용 시작 ---\n"
            + contractContent + "\n--- 계약서 내용 끝 ---";

        // 2. WebClient를 사용하여 Gemini API에 요청 전송
        WebClient webClient = WebClient.builder().baseUrl(apiUrl).build();
        
        Part part = new Part(prompt);
        Content content = new Content(Collections.singletonList(part));
        GeminiRequest requestBody = new GeminiRequest(Collections.singletonList(content));

        try {
            // 3. API 호출 및 응답 받기
            GeminiResponse response = webClient.post()
                    .uri("?key=" + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(GeminiResponse.class)
                    .block(); // 비동기 응답을 동기적으로 기다림

            // 4. AI가 생성한 텍스트(JSON 형식) 추출
            String aiJsonResult = response.getCandidates().get(0).getContent().getParts().get(0).getText();
            
            // 5. AI가 보내준 JSON 문자열을 우리가 만든 AiReviewResponse DTO로 변환
            
            if (aiJsonResult.startsWith("```json")) { // AI 응답에서 Markdown 코드 블록(```json ... ```)을 제거하는 로직
                aiJsonResult = aiJsonResult.substring(7, aiJsonResult.length() - 3);
            }
            
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(aiJsonResult, AiReviewResponse.class);

        } catch (Exception e) {
            e.printStackTrace();
            // 에러 발생 시 빈 객체 반환
            return new AiReviewResponse("AI 분석 중 오류가 발생했습니다.", Collections.emptyList(), Collections.emptyList());
        }
    }
	
	public HashMap<String, Object> selectContractList(int reqPage, String memberNo) {
		
		
		HashMap<String, Object> params = new HashMap<>();	   
	    params.put("memberNo", memberNo);
		
		HashMap<String, Object> contractMap = new HashMap<>();

        //reqPage가 0이면 페이지네이션 없이 전체 목록을 조회
        if (reqPage == 0) {
            ArrayList<Contract> contractList = contractDao.selectAllContractList(params);
            contractMap.put("contractList", contractList);
          
        } else {
            
            int viewCnt = 10;
            int pageNaviSize = 5;
            int totalCount = contractDao.selectContractCount(params);
            
            //페이징 정보
            PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
            params.put("pageInfo", pageInfo);            
            
            //계약 목록
            ArrayList<Contract> contractList = contractDao.selectContractList(params);
            
            contractMap.put("contractList", contractList);
            contractMap.put("pageInfo", pageInfo);
        }
        return contractMap;
		
		/*
		int viewCnt = 10; //한페이지당 게시글 수
		int pageNaviSize = 5; //페이지 네비 길이
		int totalCount = contractDao.selectContractCount(); //전체 게시글 수
		
		//페이징 정보
		PageInfo pageInfo = pageUtil.getPageInfo(reqPage, viewCnt, pageNaviSize, totalCount);
		
		//계약 목록
		ArrayList<Contract> contractList = contractDao.selectContractList(pageInfo);
		
		HashMap<String, Object> contractMap = new HashMap<String, Object>();
		contractMap.put("contractList", contractList);
		contractMap.put("pageInfo", pageInfo);		
		 
		return contractMap;
		*/
	}
	
	@Transactional
	public int updateContractStatus(String contractNo, ContractStatusUpdateDTO dto) {
		
		//계약 상태 업데이트
		int result = contractDao.updateContractStatus(contractNo, dto.getStatusCode());
		
		//상태 변경 시, 히스토리 업데이트
		if (result > 0) {
			result += contractDao.insertContractHistory(contractNo, dto.getContractHistoryContent(), dto.getMemberNo());
		}		
		
		return result;
	}

	@Transactional
    public int insertContract(Contract contract, List<MultipartFile> files) {
        // 1. TBL_CONTRACT에 먼저 계약 데이터를 저장        
        int result = contractDao.insertContract(contract);

        if (result > 0) {
            // 2. 계약 추가 정보가 있다면 TBL_CONTRACT_PARTY에 추가로 저장               
            List<ContractParty> partyList = contract.getPartyList(); // DTO에 getPartyList 추가 필요
            if (partyList != null && !partyList.isEmpty()) {
                for (ContractParty party : partyList) {
                    // 3. 방금 생성된 contractNo를 각 party 객체에 설정합니다.
                    party.setContractNo(contract.getContractNo());
                    result += contractDao.insertContractParty(party);
                }
            }
            
            // 3. 파일 업로드 로직           
            if (files != null) {
                for (MultipartFile file : files) {
                	if(file.isEmpty()) continue; // 파일이 비어있으면 건너뛰기
                	
                	// 3. 파일을 서버에 저장하고, 저장된 파일 정보 DTO를 받음
                    FileDTO fileDto = fileUtils.upload(file);
                    
                    // 4. DTO에 추가 정보 설정
                    fileDto.setFileTable("contract"); // 이 파일이 어느 테이블과 연관되었는지
                    fileDto.setFileId(contract.getContractNo()); // 그 테이블의 어떤 데이터와 연관되었는지 (PK)
                    fileDto.setMemberNo(contract.getMemberNo()); // 누가 올렸는지
                    
                    // 5. 파일 정보를 TBL_FILE에 최종 INSERT
                    result += fileDao.insertFile(fileDto);
                }
            }
        }
        return result;
    }	
	
	//회원 상세 조회
	public ContractDetailDto selectOneContract(String contractNo) {
		
		return contractDao.selectOneContract(contractNo);
	}
	
	//계약서 서명 업데이트
	public int updateSignature(SignatureUpdateDto signatureDto) {
	
		return contractDao.updateSignature(signatureDto);
	}
	
	

}
