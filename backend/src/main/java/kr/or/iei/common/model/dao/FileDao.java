package kr.or.iei.common.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.common.model.dto.FileDTO;

@Mapper
public interface FileDao {
	
	int insertFile(FileDTO file);

}
