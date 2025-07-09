package kr.or.iei.company.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class CompanyMember {
	
	private String contactIdx;      // CONTACT_IDX
    private String compCd;          // COMP_CD
    private String memberNo;        // MEMBER_NO
    private String contactName;     // CONTACT_NAME
    private String contactEmail;    // CONTACT_EMAIL
    private String contactPhone;    // CONTACT_PHONE
    private String isMainContact;   // IS_MAIN_CONTACT
    private String contactPosition; // CONTACT_POSITION
    private String contactDept;     // CONTACT_DEPT
    private String regDate;         // REG_DATE

}
