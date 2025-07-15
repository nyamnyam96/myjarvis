import { useState } from "react";
import createInstance from "../../axios/interceptor";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import './MemberUpd.css';

//마이페이지 - 회원 정보 수정
export default function MemberUpd(){
    //MemberMain 수정하기 Link 클릭 시, URL Path에 포함시켜 전달한 회원 아이디 추출
    const params = useParams();
    const memberId = params.memberId;
    
    const axiosInstance = createInstance();
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const navigate = useNavigate();
    
    //회원 정보 수정 요청 시, 전달할 State
    const [member, setMember] = useState({
        memberId : memberId, memberPw :"", memberName : "", memberEmail : "", memberPhone : "",memberCompName : "", memberCompNo : "" 
    });

    //기존 비밀번호 일치 여부 체크
    const [isAuth, setIsAuth] = useState(false);

    //기존 비밀번호 입력 시, 동작 함수
    function chgMemberPw(e){
        member.memberPw = e.target.value;
        setMember({...member});
    }


    //기존 비밀번호 일치성 여부 체크
    function checkPw(){
        let options = {};
        options.url = serverUrl + '/member/checkPw';
        options.method= 'post';
        options.data = member;

        axiosInstance(options)
        .then(function(res){

            if(res.data.resData){
                
                setIsAuth(true);    
                
                setMember({...member});

               
                
                //기존 비밀번호 일치하면 ID로 기존 회원 정보 조회
                let options = {};
                options.url = serverUrl + "/member/" + member.memberId;
                options.method = 'get';
                
                axiosInstance(options)
                .then(function(res){
                    if(res.data.resData != null){
                        setMember(res.data.resData);
                        setIsAuth(true);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });

            }else {
                //비밀번호 불일치 시 경고창 띄우기
              Swal.fire({
                title : '알림',
                text : '비밀번호를 잘못 입력하셨습니다.',
                icon : 'warning',
                confirmButtonText : '확인'
             })
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    //기존 회원 정보(이메일, 이름, 전화번호) 입력 시, 동작 함수
    function chgMember(e){
        member[e.target.name] = e.target.value;
        setMember({...member});
    }

    const [memberPwRe, setMemberPwRe] = useState('');
    function chgMemberPwRe(e){
        setMemberPwRe(e.target.value);
    }

    //수정하기 버튼 클릭 시, 동작 함수
    function updateMember(){
        let options = {};
        options.url = serverUrl + "/member";
        options.method = "patch";
        options.data = member;

        console.log(member);

        axiosInstance(options)
        .then(function(res){
            {/**navigate("/Member");*/}
            navigate("/Main");
        })
        .catch(function(err){
            console.log(err);
        })

    }

   

    function cancel(){

        Swal.fire({
            title : '알림',
            text : '수정을 취소하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '네',
            cancelButtonText : '취소'
        })
        .then(function(result){
            if (result.isConfirmed) {
               {/**navigate("/Member");*/}
                navigate("/Main");
            }
        })
    }

    return (
       <section className="memberUpd-container">
  <div className="left-panel">
    {/* 기존 회원 수정 폼 */}
    {isAuth ? (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMember();
          }}
        >
          <div className="input-wrap">
                         <div className="memberUpd-text">회원 수정</div>
                                <br/>
                            <div className="input-title">
                                <label htmlFor="newName">이름</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="text" id="newName" name="memberName" value={member.memberName} onChange={chgMember}></input>
                            </div> 
                        </div> 
                        <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newPw">새 비밀번호 입력</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="password" id="newPw" name="memberPw" value={member.memberPw} onChange={chgMember} placeholder="6~30글자를 입력하세요"/>
                            </div>
                              <p className="memberUpd-p"> 기존 비밀번호 다시 입력, 새로운 비밀번호 입력 가능합니다.</p>
                        </div>
                        <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newPwRe">새 비밀번호 확인</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="password" id="newPwRe" name="memberPw" value={memberPwRe} onChange={chgMemberPwRe} placeholder="비밀번호와 동일하게 입력하세요"/>
                            </div>
                               <p className="memberUpd-p"> 기존 비밀번호 입력, 새로운 비밀번호 입력 가능합니다.</p>
                        </div>
                        <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newEmail">이메일</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="text" id="newEmail" name="memberEmail" value={member.memberEmail} onChange={chgMember} placeholder="만들어져 있는 이메일을 입력하세요"></input>
                            </div> 
                        </div>
                        <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newPhone">핸드폰</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="text" id="newPhone" name="memberPhone" value={member.memberPhone} onChange={chgMember} placeholder="010-0000-0000"></input>
                            </div> 
                        </div>
                         <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newCompName">상호명</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="text" id="newCompName" name="memberCompName" value={member.memberCompName} onChange={chgMember} placeholder="회사 이름(상호명)"></input>
                            </div> 
                        </div>
                         <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newCompNo">사업자번호</label>
                            </div>
                            <div className="memberUpd-item">
                                <input type="text" id="newCompNo" name="memberCompNo" value={member.memberCompNo} onChange={chgMember} placeholder="000-00-000000"></input>
                            </div> 
                        </div>
                        
                        <div className="button-zone">
                            <button type="button" className="memberUpd-second" onClick={updateMember}>수정하기</button>
                            <button type="button" className="memberUpd-second" onClick={cancel}>취소</button>
                        </div>
                    </form>
      </>
    ) : (
      <>
       <div className="memberUpd-container2">
          <div className="form-box2">
            <h2 className="form-title2">비밀번호 수정</h2>
            <p className="form-subtitle2">본인 인증을 위해 비밀번호를 입력해주세요.</p>

            <div className="input-title2">
              <label htmlFor="oldPw">기존 비밀번호 입력</label>
            </div>
            <div className="pw-check-input">
              <input
                type="password"
                id="oldPw"
                name="memberPw"
                value={member.memberPw}
                onChange={chgMemberPw}
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="button-zone1">
              <button
                type="button"
                className="memberUpd-primary"
                onClick={checkPw}
              >
                확인
              </button>
              <button
                type="button"
                className="memberUpd-primary cancel-btn"
                onClick={cancel}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>

  <div className="right-panel">
    <div className="right-content">
      <img
        src="/Picture/MyJarvis.png" // 혹은 Horizon UI 로고 이미지 경로
        alt="Horizon UI Logo"
        className="logo"
      />

      <div className="footer-links">
        <a href="#">Support</a>
        <a href="#">License</a>
        <a href="#">Terms of Use</a>
        <a href="#">Blog</a>
      </div>
    </div>
  </div>
</section>
    )
}