package kr.or.iei.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import kr.or.iei.member.model.dto.Member;

@Mapper
public interface MemberDao {
    List<Member> selectAllMember();
}
