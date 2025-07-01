package kr.or.iei.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.dto.Member;

@Service
public class MemberService {

    @Autowired
    private MemberDao dao;

    public List<Member> getAllMembers() {
        return dao.selectAllMember();
    }
}
