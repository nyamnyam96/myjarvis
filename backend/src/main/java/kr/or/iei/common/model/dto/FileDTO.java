package kr.or.iei.common.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class FileDTO {
	
	private String fileNo;
    private String memberNo;
    private String fileOrigin;
    private String fileName;
    private String filePath;
    private String uploadDate;
    private String fileTable;
    private String fileId;
    private long fileSize;
    private char fileDeleted;
    
}
