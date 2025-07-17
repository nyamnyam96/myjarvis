package kr.or.iei.common.model.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	
	private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            // MimeMessageHelper를 사용하여 메일 내용을 구성합니다.
            // true는 멀티파트 메시지(HTML, 첨부파일 등)를 사용하겠다는 의미입니다.
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            // true는 내용이 HTML 형식임을 나타냅니다.
            helper.setText(body, true); 
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // 이메일 발송 실패 시 예외 처리
            e.printStackTrace();
        }
    }

}
