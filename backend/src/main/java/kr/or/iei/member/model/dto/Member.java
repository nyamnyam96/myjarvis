package kr.or.iei.member.model.dto;

import lombok.Data;

@Data
public class Member {
    private String memberId;
    private String memberPw;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
}
