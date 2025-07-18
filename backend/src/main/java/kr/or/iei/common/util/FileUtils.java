package kr.or.iei.common.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
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

    // ⭐ Base64 이미지 데이터를 파일로 저장하는 메서드 구현 ⭐
    public FileDTO uploadBase64Image(String base64Image, String fileTable, String fileId, String memberNo) {
        // Base64 문자열에서 "data:image/png;base64,"와 같은 데이터 URL 헤더 제거
        String base64Content = base64Image;
        if (base64Image.contains(",")) {
            base64Content = base64Image.substring(base64Image.indexOf(",") + 1);
        }

        byte[] decodedBytes;
        try {
            decodedBytes = Base64.getDecoder().decode(base64Content);
        } catch (IllegalArgumentException e) {
            System.err.println("Base64 디코딩 오류: " + e.getMessage());
            return null; // 잘못된 Base64 문자열
        }

        // 파일 확장자 결정 (여기서는 PNG로 고정하거나, Base64 헤더에서 파싱할 수 있습니다.)
        // 간단화를 위해 PNG로 가정합니다. 실제로는 base64Image 앞부분 (data:image/png;...)에서 파싱하는 것이 더 견고합니다.
        String extension = ".png"; 
        if (base64Image.startsWith("data:image/jpeg")) {
            extension = ".jpeg";
        } else if (base64Image.startsWith("data:image/gif")) {
            extension = ".gif";
        } // 필요한 경우 다른 이미지 타입 추가

        // 중복되지 않는 고유한 파일 이름 생성
        String savedFilename = UUID.randomUUID().toString() + extension;
        String filePath = fileRoot + savedFilename;

        File targetFile = new File(filePath);
        try (FileOutputStream fos = new FileOutputStream(targetFile)) {
            fos.write(decodedBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return null; // 파일 저장 실패
        }

        // FileDTO에 저장된 파일 정보 설정 및 반환
        return FileDTO.builder()
                .fileOrigin(savedFilename) // 원본 이름 대신 저장된 파일 이름을 사용할 수 있습니다.
                .fileName(savedFilename)
                .filePath(filePath)
                .fileSize(targetFile.length())
                .fileTable(fileTable) // "CONTRACT_SIGNATURE"
                .fileId(fileId)       // 계약번호 또는 서명 토큰
                .memberNo(memberNo)   // 서명한 당사자의 회원번호 (또는 계약 등록자)
                .fileDeleted('N')
                .build();
    }
}