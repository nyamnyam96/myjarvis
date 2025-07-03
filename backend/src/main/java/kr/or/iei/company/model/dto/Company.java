package kr.or.iei.company.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class Company {
    private String compCd;
    private String memberNo;
    private String compName;
    private String compTel;
    private String compAddr;
    private String ownerName;
    private char tradeStatus;
    private char compType;
    private String compNo;
    private String regDate;
}
