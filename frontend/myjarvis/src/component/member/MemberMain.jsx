import { useEffect, useState } from "react";
import createInstance from "../../axios/interceptor";
import useUserStore from "../../store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./MemberMain.css";

export default function MemberMain() {
  const [member, setMember] = useState({
    memberId: "",
    memberName: "",
    memberEmail: "",
    memberStatus: "",
    memberPhone: ""
  });

  const serverUrl = import.meta.env.VITE_BACK_SERVER;
  const axiosInstance = createInstance();
  const {
    loginMember,
    setIsLogined,
    setLoginMember,
    setAccessToken,
    setRefreshToken
  } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loginMember || !loginMember.memberId) {
      console.warn("🟡 [임시 로그인 모드] loginMember가 없어 mock 데이터로 대체합니다.");
      setMember({
        memberId: "devUser",
        memberName: "홍길동",
        memberEmail: "dev@myjarvis.com",
        memberStatus: "y",
        memberPhone: "010-1234-5678"
      });
      return;
    }

    const options = {
      url: serverUrl + "/member/" + loginMember.memberId,
      method: "get"
    };

    axiosInstance(options)
      .then(function (res) {
        if (res.data.resData != null) {
          setMember(res.data.resData);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

    function updateMember() {
      console.log("회원정보 수정 기능은 준비 중입니다.");
    }

    function deleteMember(){

        Swal.fire({
            title : '알림',
            text : '회원 탈퇴를 하시겠습니까 ?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '삭제하기',
            cancelButtonText : '취소'
        })
        .then(function(res){
          if(res.isConfirmed){
            let options = {};
            options.url = serverUrl + "/member/" + loginMember.memberId;
            options.method = 'delete';
           

            axiosInstance(options)
            .then(function(res){

                    if(res.data.resData){

                        setIsLogined(false);
                        setLoginMember(null);
                        setAccessToken(null);
                        setRefreshToken(null);
                        delete axiosInstance.defaults.headers.common['Authorization'];
                    

                        navigate("/Home");
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        });
       
}

    return (
        
        
        <section className="member-container bg-gray-50 dark:bg-gray-900 px-6 py-8 rounded-xl shadow-sm">
                   
            <div className="member-title">{member.memberId}님의 마이페이지</div>
            <form onSubmit={function(e){
                e.preventDefault();
                updateMember();
            }}>
                <table className="tbl my-info" style={{width : "80%", margin : " 0 auto"}}>
                    <tbody>
                      <tr>
                        <th>
                            아이디
                        </th>
                            <td className="input-group">
                                <div className="memberMain-item">
                                    {member.memberId}
                                </div>
                            </td>
                      </tr>
                      <tr>
                         <th>
                            <label htmlFor="memberName">이름</label>
                         </th>
                         <td className="input-group">
                            <div className="memberMain-item">
                                {member.memberName}
                            </div>
                         </td>
                      </tr>
                      <tr>
                         <th>
                            <label htmlFor="memberEmail">이메일</label>
                         </th>
                         <td className="input-group">
                            <div className="memberMain-item">
                                {member.memberEmail}
                            </div>
                         </td>
                      </tr>
                      
                      <tr>
                         <th>
                            <label htmlFor="memberStatus">회원등급</label>
                         </th>
                         <td className="input-group">
                            <div className="memberMain-item">
                                {member.memberStatus == 'y' ? '일반회원' : '관리자'}
                            </div>
                         </td>
                      </tr>
                      <tr>
                         <th>
                            <label htmlFor="memberPhone">핸드폰</label>
                         </th>
                         <td className="input-group">
                            <div className="memberMain-item">
                                {member.memberPhone}
                            </div>
                         </td>
                      </tr>
                      <tr>
                         <th>
                            <label htmlFor="memberName">상호명</label>
                         </th>
                         <td className="input-group">
                            <div className="memberMain-item">
                                {member.memberCompName}
                            </div>
                         </td>
                      </tr>
                       <tr>
                         <th>
                            <label htmlFor="memberName">사업자 번호</label>
                         </th>
                         <td className="input-group">
                            <div className="memberMain-item">
                                {member.memberCompNo}
                            </div>
                         </td>
                      </tr>
                    </tbody>
                </table>
                <div className="button">
                    <Link to={"/memberUpd/"+member.memberId}  className="btn-first">수정하기</Link>
                    <button type="button" className="btn-second" onClick={deleteMember}>회원탈퇴</button>
                </div>
            </form>
        </section>
    )
}

