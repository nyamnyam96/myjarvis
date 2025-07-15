package kr.or.iei.common.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.common.model.dto.FileDTO;

@Component
public class FileUtils {

    // application.properties에서 파일 저장 경로를 읽어옴
    @Value("${file.root}")
    private String fileRoot;

    public FileDTO upload(MultipartFile file) {
        // 1. 파일의 원본 이름 가져오기
        String originalFilename = file.getOriginalFilename();

        // 2. 중복되지 않는 고유한 파일 이름 생성 (UUID 사용)
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + extension;
        
        // 3. 파일을 저장할 전체 경로 생성
        String filepath = fileRoot + filename;

        // 4. 파일 저장
        try {
            file.transferTo(new File(filepath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 5. DB에 저장할 파일 정보 DTO 생성 및 반환
        return FileDTO.builder()
                .fileOrigin(originalFilename)
                .fileName(filename)
                .filePath(filepath)
                .fileSize(file.getSize())
                .build();
    }
}