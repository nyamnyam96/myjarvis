import { useEffect, useState } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Join from './Join';
import {Link} from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import createInstance from '../../axios/interceptor';
import Swal from 'sweetalert2';
import "./Login.css";



export default function Login(){



    const {isLogined, setIsLogined, setLoginMember, setAccessToken, setRefreshToken} = useUserStore();
 
    useEffect(function(){ //의존성 배열
        if(!isLogined){   //외부에서 강제 로그아웃 시킨 경우
            setLoginMember(null);
        }
    }, [])

    const [test, setTest] = useState('');

    //환경변수 파일에 저장된 변수 읽어오기
    const serverUrl = import.meta.env.VITE_BACK_SERVER;

    //인터셉터에서 커스터마이징한 axiosInstance 사용
    const axiosInstance = createInstance();

    const [member, setMember] = useState({
        memberId : "",
        memberPw : ""
    });

    function chgMember(e){
        member[e.target.id] = e.target.value;
        setMember({...member});
    }

    const navigate = useNavigate();

    //로그인 요청했을시
    function login(){
        //member 객체에서 아이디 memberId or memberPw가 빈값이면
        if(member.memberId == '' || member.memberPw == ''){
            //Swal로 경고창을 띄움
            Swal.fire({
               title : '알림',
               text : '아이디 또는 비밀번호를 입력하세요',
               icon : 'warning',
               confirmButtonText : '확인' 
            });
        }else {
            //입력이 정상일 경우 axiosInstance로 서버에 POST 요청 준비
            //요청 serverUrl + /member/login
            //데이터는 member
            let options = {};
            options.url = serverUrl + '/member/login';
            options.method = 'post';
            options.data = member;
        
            axiosInstance(options)
            .then(function(res){ //서버에 요청을 보낸후 응답 res 받음
                if(res.data.resData == null){ //응답 데이터 resData가 null이면 로그인 실패 
                    Swal.fire({
                        title : '알림',
                        text : res.data.clientMsg,
                        icon : res.data.alertIcon,
                        confirmButtonText : '확인'
                    });
                }else {

                    const loginMember = res.data.resData;

                    //정상 로그인시 (스토리지 데이터 변경)
                    setIsLogined(true);                 //로그인 상태로 변경
                    setLoginMember(loginMember.member); //로그인한 회원 정보 저장

                    //스토리지에 토큰 저장
                    setAccessToken(loginMember.accessToken);
                    setRefreshToken(loginMember.refreshToken);

                    //Main 컴포넌트로 전환
                    navigate('/');
                }

            })
            .catch(function(err){
                console.log(err);
            });
        }

    }


    return (
         <section className="mypage-container">
            
                <div className='page-container'>
                    <div className="page-title">MyJarvis</div>
                        <form autoComplete="off"
                            onSubmit={function(e){
                                e.preventDefault(); //form태그 기본 이벤트  
                                login();            //로그인시 요청 함수
                        }}>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberId">아이디</label>
                    </div>
                    <div className="input-item">
                        <input type="text"   id="memberId" value={member.memberId} onChange={chgMember} />
                    </div>
                </div>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPw">비밀번호</label>
                    </div>
                    <div className="input-item">
                        <input type="password" id="memberPw" value={member.memberPw} onChange={chgMember}/>
                    </div>
                </div>
                <div className="login-button-box">
                    
                    <button type="submit" className='btn-primary lg'>
                        로그인
                    </button>  
                    <p>아직 회원이 아니신가요?</p>
                </div>
               
            </form>
                    <Link to="/Agree">회원가입 하러가기</Link>
                </div>
            
         </section>
    )

    
}