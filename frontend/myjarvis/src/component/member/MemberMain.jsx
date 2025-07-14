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
    memberStatus: ""
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

  function deleteMember() {
    if (!loginMember || !loginMember.memberId) {
      Swal.fire("개발모드", "임시 로그인 상태에서는 회원 탈퇴 기능을 사용할 수 없습니다.", "info");
      return;
    }

    Swal.fire({
      title: "알림",
      text: "회원 탈퇴를 하시겠습니까 ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소"
    }).then(function (res) {
      if (res.isConfirmed) {
        const options = {
          url: serverUrl + "/member/" + loginMember.memberId,
          method: "delete"
        };

        axiosInstance(options)
          .then(function (res) {
            if (res.data.resData) {
              setIsLogined(false);
              setLoginMember(null);
              setAccessToken(null);
              setRefreshToken(null);
              delete axiosInstance.defaults.headers.common["Authorization"];
              navigate("/login");
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    });
  }

  return (
    <section className="mypage-container">
      <div className="page-title text-gray-800 dark:text-white">
        {member.memberId}님의 마이페이지
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMember();
        }}
      >
        <div className="px-4">
          <table
            className="tbl my-info"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <tbody>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">아이디</th>
                <td className="input-group">
                  <div className="input-item dark:text-white">
                    {member.memberId}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">이름</th>
                <td className="input-group">
                  <div className="input-item dark:text-white">
                    {member.memberName}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">이메일</th>
                <td className="input-group">
                  <div className="input-item dark:text-white">
                    {member.memberEmail}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">회원등급</th>
                <td className="input-group">
                  <div className="input-item dark:text-white">
                    {member.memberStatus === "y" ? "일반회원" : "관리자"}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">핸드폰</th>
                <td className="input-group">
                  <div className="input-item dark:text-white">
                    {member.memberPhone}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">상호명</th>
                <td className="input-group">
                  <div className="input-item dark:text-white"></div>
                </td>
              </tr>
              <tr>
                <th className="dark:bg-gray-800 dark:text-white">사업자 번호</th>
                <td className="input-group">
                  <div className="input-item dark:text-white"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button">
          <Link
            to={"/memberUpd/" + member.memberId}
            className="btn-first"
          >
            수정하기
          </Link>
          <button
            type="button"
            className="btn-second"
            onClick={deleteMember}
          >
            회원탈퇴
          </button>
        </div>
      </form>
    </section>
  );
}
