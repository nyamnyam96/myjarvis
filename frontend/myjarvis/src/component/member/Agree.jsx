import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import Join from "./Join";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import './Agree.css';

export default function Agree(){

  const navigate = useNavigate();

  const [agree, setAgree] = useState({
    agree1 : false,
    agree2 : false,
    agree3 : false,
    agree4 : false,
    agree5 : false,
    agree6 : false
  });
  
  
  function chgAgree(e){
      const {className, checked} = e.target;

      setAgree(prev => ({
      ...prev,
      [className] : checked
    }));
    console.log(className);
      
   
  }

  function toggleAllAgree(e){
    const {checked} = e.target;
    setAgree({
      agree1 : checked,
      agree2 : checked,
      agree3 : checked,
      agree4 : checked,
      agree5 : checked,
      agree6 : checked
    });

  }

  function goToJoin(){
    const { agree1, agree2, agree3, agree4, agree5} = agree;

    if(agree1 && agree2 && agree3 && agree4 && agree5 ){
      console.log("동의한 항목 : ", agree);

      Swal.fire({
        title : '확인',
        text : '회원가입 페이지로 이동',
        icon : 'success',
        confirmButtonText : '확인'
      }).then(function(res){
        navigate('/join');
      });

    }else{
      Swal.fire({
        title : '알림',
        text : '필수 약관에 모두 동의하셔야 합니다.',
        icon : 'warning',
        confirmButtonText : '확인'
      });
      

    }
  }

  return (
    
      <section className="main-container1">
        <h1 className="main-title">약관 동의</h1>
          <form onSubmit={function(e){
            e.preventDefault();
            goToJoin();
            }}>
              <div className="container">
                <div className="all-input">
                    <label className="checkbox">
                      <span className="sub-title"> <input type="checkbox" className="select-all" onChange={toggleAllAgree}/>모든 약관을 확인하고 전체 동의합니다.</span>
                    </label>
                </div>

              <div className="input-label">
                <label><input type="checkbox" className="agree1" checked={agree.agree1} onChange={chgAgree} /> 이용약관 동의 (필수) 
                  <Link to="/AgreeText"  style={{ marginLeft: "10px", color: "blue" }}>
                    [ 전문 보기]
                  </Link>
                </label>  
                    
                </div>
                <div className="input-label">
                    <label><input type="checkbox" className="agree2" checked={agree.agree2} onChange={chgAgree} /> 개인정보 수집 및 이용 동의 (필수)
                    <Link to="/AgreeText"  style={{ marginLeft: "10px", color: "blue" }}>
                      [ 전문 보기]
                    </Link>
                  </label>  
                </div>
                <div className="input-label">
                  <label><input type="checkbox" className="agree3" checked={agree.agree3} onChange={chgAgree} /> 개인정보 제3자 제공 동의 (필수)
                    <Link to="/AgreeText"  style={{ marginLeft: "10px", color: "blue" }}>
                      [ 전문 보기]
                    </Link>
                  </label>  
                </div>
                <div className="input-label">
                    <label><input type="checkbox" className="agree4" checked={agree.agree4} onChange={chgAgree} /> 개인정보 처리 위탁 동의 (필수)
                      <Link to="/AgreeText"  style={{ marginLeft: "10px", color: "blue" }}>
                      [ 전문 보기]
                      </Link>
                    </label>  
                </div>
                <div className="input-label">
                    <label><input type="checkbox" className="agree5" checked={agree.agree5} onChange={chgAgree} /> 만 14세 이상입니다. (필수)
                      <Link to="/AgreeText"  style={{ marginLeft: "10px", color: "blue" }}>
                      [ 전문 보기]
                      </Link>
                    </label>  
                </div>
                <div className="input-label">
                    <label><input type="checkbox" className="agree6" checked={agree.agree6} onChange={chgAgree} /> 광고성 정보 동의  (선택)
                      <Link to="/AgreeTextSelect"  style={{ marginLeft: "10px", color: "blue" }}>
                      [ 전문 보기]
                      </Link>
                    </label>  
                </div>
                <button type="submit" className="button-move">회원가입으로 이동</button>
            </div>
         </form>
      </section>
        
  )
}