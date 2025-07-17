package kr.or.iei.contract.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

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
import kr.or.iei.common.model.service.EmailService;
import kr.or.iei.common.util.FileUtils;
import kr.or.iei.common.util.PageUtil;
import kr.or.iei.company.model.dao.CompanyDao;
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
import kr.or.iei.contract.model.dto.PartyDto;
import kr.or.iei.contract.model.dto.SignatureRequestDto;
import kr.or.iei.contract.model.dto.SignatureUpdateDto;

@Service
public class ContractService {
	
	@Autowired
	private ContractDao contractDao;
	
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private PageUtil pageUtil;	
	
	@Autowired
	private FileUtils fileUtils;
	
	@Autowired
	private FileDao fileDao;
	
	@Autowired
	private EmailService emailService;
	
	@Value("${server.url}")
	private String serverUrl;	
    @Value("${gemini.api.url}")
    private String apiUrl;
    @Value("${gemini.api.key}")
    private String apiKey;   
    
	// 👇 [1단계] 경로 변환 로직을 더 범용적인 헬퍼 메소드로 개선합니다.
    private String convertPathToUrl(String pathOrFilename) {
        if (pathOrFilename == null || pathOrFilename.trim().isEmpty()) {
            return null;
        }
        // '\' 또는 '/' 경로 구분자 모두를 처리하여 파일 이름만 안전하게 추출
        int lastSlashIndex = Math.max(pathOrFilename.lastIndexOf('\\'), pathOrFilename.lastIndexOf('/'));
        String filename = (lastSlashIndex != -1) 
                          ? pathOrFilename.substring(lastSlashIndex + 1) 
                          : pathOrFilename;
        
        return serverUrl + "/uploads/" + filename;
    }
    
    
    // 👇 [2단계] 기존의 서명 이미지 변환 로직을 새 헬퍼 메소드를 사용하도록 수정합니다.
    private void convertSignaturePathsToUrls(ContractDetailDto contractDetail) {
        if (contractDetail != null && contractDetail.getParties() != null) {
            for (PartyDto party : contractDetail.getParties()) {
                party.setSignatureImage(convertPathToUrl(party.getSignatureImage()));
            }
        }
    }
    
    // 👇 [3단계] (핵심!) 첨부파일 경로도 웹 URL로 변환하는 로직을 추가합니다.
    private void convertAttachmentPathsToUrls(ContractDetailDto contractDetail) {
        if (contractDetail != null && contractDetail.getAttachedFiles() != null) {
            for (FileDTO file : contractDetail.getAttachedFiles()) {
                file.setFilePath(convertPathToUrl(file.getFilePath()));
            }
        }
    }
    
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
        	// 2. '나'를 '당사자'로 먼저 자동 등록
            String myCompCd = companyDao.findCompCdByMemberNo(contract.getMemberNo());
            ContractParty selfParty = new ContractParty();
            selfParty.setContractNo(contract.getContractNo());
            selfParty.setMemberNo(contract.getMemberNo());
            selfParty.setCompCd(myCompCd);
            selfParty.setRole("당사자");
            result += contractDao.insertContractParty(selfParty);

            // 3. 프론트에서 받은 '고객사' 정보(partyList)를 등록
            List<ContractParty> partyList = contract.getPartyList();
            if (partyList != null && !partyList.isEmpty()) {
                for (ContractParty party : partyList) {
                    // 이제 이 party 객체는 항상 '고객사' 정보입니다.
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
	
	//계약서 서명 업데이트
	public int updateSignature(SignatureUpdateDto signatureDto) {
		
		System.out.println("===== 서명 업데이트 요청 데이터 =====");
	    System.out.println("ContractNo: " + signatureDto.getContractNo());
	    System.out.println("getPartyId: " + signatureDto.getPartyId());
	    System.out.println("==================================");
	
		return contractDao.updateSignature(signatureDto);
	}
	
	//서명 요청 이메일 발송
	@Transactional
	public void sendSignatureRequestEmail(String contractNo, SignatureRequestDto req) { // 파라미터 변경
		
		// 👇👇 이 로그를 추가해주세요! 👇👇
	    System.out.println("--- [이메일 발송 로그] 서명 요청 대상 ID: " + req.getRecipientMemberNo() + " ---");
	    
	    // 1. 랜덤 고유 토큰 생성
	    String signToken = UUID.randomUUID().toString();	    

	    // 2. 해당 담당자의 TBL_CONTRACT_PARTY에 토큰 저장
	    //    (이 로직이 성공해야만 메일이 발송되므로 안전합니다.)
	    int result = contractDao.updateSignToken(signToken, contractNo, req.getRecipientMemberNo());

	    if (result > 0) {
	        // 3. 이메일 제목과 본문 생성
	        String subject = "[마이자비스] 서명 요청: 계약서 서명을 완료해주세요.";

	        // 👇 [핵심] 이제 토큰을 이용해 '공개 서명 페이지' 링크를 생성합니다.
	        String signUrl = "http://localhost:5173/sign/" + signToken; 

	        String body = "<h1>계약서 서명 요청</h1>"
	                    + "<p>안녕하세요. " + req.getRecipientName() + "님,</p>"
	                    + "<p>아래 링크를 클릭하여 계약서 내용을 확인하고 서명을 완료해주세요.</p>"
	                    + "<h3><a href='" + signUrl + "'>계약서 확인 및 서명하기</a></h3>"
	                    + "<p>감사합니다.</p>";

	        emailService.sendEmail(req.getRecipientEmail(), subject, body);

	        // (선택) 이메일 발송 이력을 DB에 기록
	    }
	}
	
	//고객사 서명 불러오기
	public ContractDetailDto selectContractByToken(String signToken) {
        ContractDetailDto contractDetail = contractDao.selectContractByToken(signToken);
        
        // 여기도 마찬가지로 모두 변환
        convertSignaturePathsToUrls(contractDetail);
        convertAttachmentPathsToUrls(contractDetail);

        return contractDetail;
    }
	
	// 공개 서명 저장 API	
	@Transactional
	public int updateSignatureByToken(SignatureUpdateDto signatureDto) {
	    System.out.println("\n\n--- [로그] 공개 서명 저장 API 시작 ---");
	    
	    String signToken = signatureDto.getSignToken();
	    System.out.println("[1] 전달받은 signToken: " + signToken);

	    // 1. signToken으로 계약 번호 조회
	    System.out.println("[2] DB에서 계약 번호 조회를 시작합니다...");
	    String contractNo = contractDao.getContractNoBySignToken(signToken);
	    System.out.println("[3] contractNo 조회 결과: " + contractNo);

	    // [핵심 수정!] 토큰으로 계약 담당자(내부 직원)의 MEMBER_NO 조회
	    String internalMemberNo = contractDao.getMemberNoByContractNo(contractNo);
	    System.out.println("[4] 계약 담당자(파일 소유자) 조회 결과: " + internalMemberNo);

	    // 2. 필수 정보 유효성 검사
	    if (contractNo == null || internalMemberNo == null) {
	        System.err.println(">>>>> [오류] 토큰으로 계약 또는 담당자 정보를 찾을 수 없습니다.");
	        return 0; 
	    }
	    signatureDto.setContractNo(contractNo);

	    // 3. Base64 이미지 파일 저장
	    System.out.println("[5] Base64 이미지 파일 저장을 시도합니다...");
	    FileDTO fileDto = fileUtils.uploadBase64Image(
	        signatureDto.getSignatureImage(),
	        "CONTRACT_SIGNATURE",
	        contractNo,
	        internalMemberNo  // 파일 업로더를 계약 담당자로 지정
	    );

	    int result = 0;
	    if (fileDto != null) {
	        System.out.println("[6] 파일 저장 성공! -> " + fileDto.getFileName());

	        // 4. TBL_FILE에 파일 정보 삽입
	        System.out.println("[7] TBL_FILE에 파일 정보 저장을 시도합니다...");
	        result = fileDao.insertFile(fileDto);
	        
	        if (result > 0) {
	            System.out.println("[8] TBL_FILE 저장 성공!");
	            
	            // DB에 '파일 이름'만 저장하는 방식으로 최종 수정
	            signatureDto.setSignatureImage(fileDto.getFileName()); 
	            System.out.println("[9] TBL_CONTRACT_PARTY 업데이트 시도...");
	            
	            result += contractDao.updateSignatureByToken(signatureDto);
	            
	            if (result > 1) {
	                 System.out.println("[10] 최종 업데이트 성공! 총 " + result + "개 행 처리 완료.");
	            } else {
	                 System.err.println(">>>>> [오류] TBL_CONTRACT_PARTY 업데이트 실패!");
	            }

	        } else {
	            System.err.println(">>>>> [오류] TBL_FILE에 파일 정보 저장 실패!");
	        }
	    } else {
	        System.err.println(">>>>> [오류] Base64 이미지 파일 저장 실패!");
	    }
	    
	    System.out.println("--- [로그] 공개 서명 저장 API 종료, 최종 반환 값: " + result + " ---");
	    return result;
	}
	
	
	// 👇 [4단계] 두 개의 메인 조회 메소드를 수정합니다.
    public ContractDetailDto selectOneContract(String contractNo) {
    	System.out.println("\n\n--- [첨부파일 추적 로그] 1. 상세 조회 시작 ---");
        System.out.println("조회할 계약 번호: " + contractNo);
        
        // 1. DAO를 통해 계약 상세 정보를 조회합니다.
        ContractDetailDto contractDetail = contractDao.selectOneContract(contractNo);
        System.out.println("[첨부파일 추적 로그] 2. DAO 실행 완료");

        // 2. DAO가 반환한 데이터의 상태를 확인합니다.
        if (contractDetail == null) {
            System.err.println(">>>>> [오류] contractDetail 객체 자체가 null입니다.");
            return null;
        }

        if (contractDetail.getAttachedFiles() == null) {
            System.err.println(">>>>> [오류] attachedFiles 리스트가 null입니다! resultMap 설정을 확인하세요.");
        } else if (contractDetail.getAttachedFiles().isEmpty()) {
            System.out.println("[첨부파일 추적 로그] 3. attachedFiles 리스트가 비어있습니다 (size: 0).");
        } else {
            System.out.println("[첨부파일 추적 로그] 3. attachedFiles 리스트에 " + contractDetail.getAttachedFiles().size() + "개의 파일이 있습니다.");
            // 첫 번째 파일의 경로를 확인해봅니다.
            System.out.println("[첨부파일 추적 로그] 4. 변환 전 첫 번째 파일 경로: " + contractDetail.getAttachedFiles().get(0).getFilePath());
        }

        // 3. 기존의 경로 변환 로직을 실행합니다.
        convertSignaturePathsToUrls(contractDetail);
        convertAttachmentPathsToUrls(contractDetail);
        System.out.println("[첨부파일 추적 로그] 5. 경로 변환 로직 실행 완료");

        if (contractDetail.getAttachedFiles() != null && !contractDetail.getAttachedFiles().isEmpty()) {
            System.out.println("[첨부파일 추적 로그] 6. 변환 후 첫 번째 파일 경로: " + contractDetail.getAttachedFiles().get(0).getFilePath());
        }
        
        System.out.println("--- [첨부파일 추적 로그] 7. 최종 데이터 반환 ---\n\n");
        return contractDetail;
    }
    
    

}
