import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Join from './Join';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import createInstance from '../../axios/interceptor';
import Swal from 'sweetalert2';
import styles from './Login.module.css';  // CSS 모듈 import

export default function Login() {
  // 전역 상태관리에서 로그인 상태 및 토큰, 회원 정보 함수 가져오기
  const { isLogined, setIsLogined, setLoginMember, setAccessToken, setRefreshToken } = useUserStore();

  // 컴포넌트가 처음 렌더링 될 때 로그인 상태가 아니면 회원 정보 초기화
  useEffect(() => {
    if (!isLogined) {
      setLoginMember(null);
    }
  }, []);

  // 로그인 입력폼 상태
  const [member, setMember] = useState({
    memberId: '',
    memberPw: ''
  });

  // input 변경 시 상태 업데이트
  function chgMember(e) {
    member[e.target.id] = e.target.value;
    setMember({ ...member });
  }

  // 네비게이션 훅
  const navigate = useNavigate();

  // 환경변수에서 백엔드 서버 주소 읽기
  const serverUrl = import.meta.env.VITE_BACK_SERVER;

  // axios 인터셉터 인스턴스 생성
  const axiosInstance = createInstance();

  // 로그인 요청 함수
  function login() {
    // 아이디 또는 비밀번호가 빈값이면 경고창 출력
    if (member.memberId === '' || member.memberPw === '') {
      Swal.fire({
        title: '알림',
        text: '아이디 또는 비밀번호를 입력하세요',
        icon: 'warning',
        confirmButtonText: '확인'
      });
    } else {
      // 정상 입력 시 서버에 로그인 요청
      let options = {
        url: serverUrl + '/member/login',
        method: 'post',
        data: member
      };

      axiosInstance(options)
        .then(function (res) {
          // 로그인 실패 시 서버에서 메시지 받으면 알림창 표시
          if (res.data.resData == null) {
            Swal.fire({
              title: '알림',
              text: res.data.clientMsg,
              icon: res.data.alertIcon,
              confirmButtonText: '확인'
            });
          } else {
            // 로그인 성공 시 전역 상태 업데이트 및 메인 화면 이동
            const loginMember = res.data.resData;

            setIsLogined(true);
            setLoginMember(loginMember.member);
            setAccessToken(loginMember.accessToken);
            setRefreshToken(loginMember.refreshToken);

            navigate('/Main');
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

  return (
    <section className={styles.mypageContainer}>
      {/* 섹션 스타일 (배경 등 전체 박스) */}
      <div className={styles.pageContainer}>
        {/* 로그인 박스 */}
        {/* 제목 */}
        <div className={styles.pageTitle}><img src="/Picture/Jarvis.logo.png"  />MyJarvis</div>

        {/* 로그인 폼 */}
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault(); // 폼 기본 제출 방지
            login(); // 로그인 함수 호출
          }}
        >
          {/* 아이디 입력 */}
          <div className={styles.inputWrap}>
            <div className="input-title">
              <label htmlFor="memberId">아이디</label>
            </div>
            <div className={styles.inputItem2}>
              <input type="text" id="memberId" value={member.memberId} onChange={chgMember} />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className={styles.inputWrap}>
            <div className="input-title">
              <label htmlFor="memberPw">비밀번호</label>
            </div>
            <div className={styles.inputItem2}>
              <input type="password" id="memberPw" value={member.memberPw} onChange={chgMember} />
            </div>
          </div>

          {/* 로그인 버튼 박스 */}
          <div className={styles.loginButtonBox}>
            <button type="submit" className="btn-primary lg">
              로그인
            </button>
            <p className={styles.loginButtonBoxP}>아직 회원이 아니신가요?</p>
          </div>
        </form>

        {/* 회원가입 링크 */}
        <Link to="/Agree" className={styles.link}>
          회원가입 하러가기
        </Link>
      </div>
    </section>
  );
}
