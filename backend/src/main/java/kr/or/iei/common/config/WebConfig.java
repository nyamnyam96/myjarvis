package kr.or.iei.common.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.Filter;
import kr.or.iei.common.filter.EncodingFilter;

@Configuration // 설정 파일임을 알려주는 어노테이션
public class WebConfig implements WebMvcConfigurer {

    // 인코딩 필터 등록 (모든 요청 UTF-8 처리)
    @Bean
    public FilterRegistrationBean<Filter> encodingFilter() {
        FilterRegistrationBean<Filter> filterReg = new FilterRegistrationBean<>();
        filterReg.setFilter(new EncodingFilter());         // 등록할 필터 클래스
        filterReg.setOrder(1);                             // 필터 실행 순서
        filterReg.addUrlPatterns("/*");                    // 모든 요청에 대해 필터 적용
        return filterReg;
    }    
    
    //패스워드 암호화 객체 등록
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }  
        
       
}