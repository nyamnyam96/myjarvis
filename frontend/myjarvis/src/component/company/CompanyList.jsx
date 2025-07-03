import axios from "axios";
import { useEffect, useState } from "react";

export default function CompanyList(){
    
    //API 서버 주소 serverUrl에 저장
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    
    //백엔드에서 받아온 데이터를 저장할 state
    const [companyList, setCompanyList] = useState([]);

    useEffect(function(){

        let options = {};
        options.url = serverUrl + "/company/list";
        options.method = 'get';
        
        //axios를 이용하여 백엔드 API 호출
        axios(options)
        .then(function(res){
            //성공 시, 불러온 데이터 state에 저장
            setCompanyList(res.data)  ;          
        })
        .catch(function(err){
            console.log(err)
        });

    }, []);

    return (
        <div className="content-wrap">            
            <div className="content-header">
                <span className="content-title">고객사 관리</span>
                <button className="header-btn">신규 등록</button>
            </div>
            <div className="content-body">
                <div className="filter-bar">
                    <div className="search-box">
                        <span className="material-symbols-outlined">search</span>
                        <input type="text" placeholder="고객사 검색" />
                    </div>
                    {/* 필터 버튼 등 추가 공간 */}
                </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                        <th>회사명</th>
                        <th>대표자명</th>
                        <th>연락처</th>
                        <th>사업자번호</th>
                        <th>등록일</th>
                        <th className="manage-btns">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyList.map((company) =>
                        company ? <Company key={company.compCd} company={company} /> : null
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                {/* 페이지네이션 기능 구현 시 여기에 컴포넌트 추가 */}
                </div>
            </div>
        </div>
    );
};

function Company(props){
    const company = props.company

    return(
        <tr>
            <td>{company.compName}</td>
            <td>{company.ownerName}</td>
            <td>{company.compTel}</td>
            <td>{company.compNo}</td>
            <td>{company.regDate}</td>     
        </tr>
    );
}
