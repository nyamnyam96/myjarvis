package kr.or.iei.common.filter;

import java.io.IOException;

import jakarta.servlet.*;

public class EncodingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // 요청 인코딩 설정
        request.setCharacterEncoding("utf-8");

        // 다음 필터 또는 요청 처리로 넘기기
        chain.doFilter(request, response);
    }
}