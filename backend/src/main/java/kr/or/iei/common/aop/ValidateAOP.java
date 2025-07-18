package kr.or.iei.common.aop;


import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import kr.or.iei.common.exception.CommonException;
import kr.or.iei.common.util.JwtUtils;

/*
 * AOP : 관점 지향 프로그래밍
 * 		- 공통 기능을 핵심 비즈니스 로직과 분리해서, 재사용성과 유지보수성을 향상 시킬 수 있다.
 * 		- 횡단 관심사 (트랜잭션, 로깅 등)를 비즈니스 로직과 분리.
 * */

public class ValidateAOP {
	
	//Pointcut : 공통 기능을 수행할 메소드를 지정할 때 사용하는 어노테이션
	@Pointcut("execution(* kr.or.iei.*.controller.*.*(..))") //모든 Controller 메소드
	public void allControllerPointcut() {}
	
	//사용자 정의 어노테이션 지정
	@Pointcut("@annotation(kr.or.iei.common.annotation.NoTokenCheck)")
	public void noTokenCheckAnnotation() {}
	
	
	@Autowired
	private JwtUtils jwtUtils;
	
	//모든 Controller 메소드 중, noTokenCheck 어노테이션이 작성되지 않은 메소드가 실행되기 이전에, 수행할 공통 로직
	@Before("allControllerPointcut() && !noTokenCheckAnnotation()")
	public void validateTokenAop() {
		//요청 객체 얻어오기
		HttpServletRequest request = ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getRequest();
		
		//헤더에서 토큰 추출
		/*
		 * URL ex) : http://localhost:9999/member/checkPw
		 * URI ex) : /member/checkPw
		 * */
		String uri = request.getRequestURI();
		
		//재발급 요청이면, refreshToken을 추출하고, 아니면 accessToken 추출
		String token = uri.endsWith("refresh")
						? request.getHeader("refreshToken")
					    : request.getHeader("Authorization");
		
		//토큰 검증 메소드 호출
		Object resObj = jwtUtils.validateToken(token);
		
		//토큰 검증 실패
		if(resObj instanceof HttpStatus httpStatus) {
			CommonException ex = new CommonException("invalid jwtToken in request Header");
			ex.setErrorCode(httpStatus);
			throw ex;
		}
	}
}
