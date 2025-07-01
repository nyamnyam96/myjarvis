package kr.or.iei.common.filter;

import java.io.IOException;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import kr.or.iei.common.util.JwtUtils;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String authHeader = req.getHeader("Authorization");

        // 인증 토큰 검사 (Bearer 방식)
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // "Bearer " 이후의 토큰
            Object result = jwtUtils.validateToken(token);

            if (result instanceof HttpStatus) {
                res.setStatus(((HttpStatus) result).value());
                return;
            }

            // 검증 완료 후, 사용자 정보 request에 저장 가능 (선택 사항)
            // req.setAttribute("loginMember", result);
        }

        chain.doFilter(request, response);
    }
}
