package kr.or.iei.invoice.model.dto;

import java.util.List;

import kr.or.iei.company.model.dto.Company;
import kr.or.iei.company.model.dto.CompanyMember;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Invoice {
	
	private String invoiceNo; 		 // 청구서 고유번호
	private String contractNo;		 // 계약 고유번호
	private String memberNo;		 // 작성자 회원 번호
	private long invoiceDeposit;	 // 청구 금액
	private String invoiceSend;		 // 청구서 발송일
	private char invoiceIsSend;		 // 발송 여부
	private String invoicePaid;		 // 입금 일자
	private char invoiceIsPaid;		 // 입금 여부
	private String invoiceMethod;	 // 결제 수단
	private String regDate;			 // 청구서 생성일자
	private char invoiceStatusCode;	 // 청구 상태
	
	private String contractTitle;   // 계약명
    private String companyName;     // 고객사명
    private String invoiceStatusName; // 청구 상태명 (예: "미납", "완료")

}
