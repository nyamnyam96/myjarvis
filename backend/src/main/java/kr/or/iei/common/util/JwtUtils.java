package kr.or.iei.common.util;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtUtils {

    @Value("${jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${jwt.expire-minute}")
    private int jwtExpireMinute;

    // AccessToken 생성 메소드 (memberId만 포함)
    public String createAccessToken(String memberId) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());

        Calendar calendar = Calendar.getInstance();
        Date startTime = calendar.getTime();
        calendar.add(Calendar.MINUTE, jwtExpireMinute);
        Date expireTime = calendar.getTime();

        return Jwts.builder()
                   .issuedAt(startTime)
                   .expiration(expireTime)
                   .signWith(key)
                   .claim("memberId", memberId)
                   .compact();
    }

    // 토큰 유효성 검증
    public Object validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());

            Claims claims = (Claims) Jwts.parser()
                                         .verifyWith(key)
                                         .build()
                                         .parse(token)
                                         .getPayload();

            return claims.get("memberId");

        } catch (SignatureException e) {
            return HttpStatus.UNAUTHORIZED;
        } catch (Exception e) {
            return HttpStatus.FORBIDDEN;
        }
    }
}
