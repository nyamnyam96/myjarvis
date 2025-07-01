package kr.or.iei.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class AopLogger {

    // 모든 Service의 메소드 실행 전 로그 찍기
    @Before("execution(* kr.or.iei..service..*(..))")
    public void beforeServiceMethod(JoinPoint jp) {
        System.out.println(">>> AOP LOG: " + jp.getSignature().toShortString());
    }
}
