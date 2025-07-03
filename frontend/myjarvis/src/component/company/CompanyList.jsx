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
        <div>
            <h2>고객사 목록</h2>
            <hr />
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                <tr>
                    <th>회사명</th>
                    <th>대표자명</th>
                    <th>연락처</th>
                    <th>사업자번호</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody>
                {/* state에 저장된 데이터를 map 함수로 반복하며 화면에 렌더링 */}
                {companyList.map(function(company, index){
                    return <Company key={"commany"+index} company={company} />;
                })}
                </tbody>
            </table>
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
