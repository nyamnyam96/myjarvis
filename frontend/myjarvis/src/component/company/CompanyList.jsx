import "./CompanyList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "./companyCommon/PageNavi";

export default function CompanyList(){    
    
    const serverUrl = import.meta.env.VITE_BACK_SERVER;     //API 서버 주소 serverUrl에 저장    
    const [companyList, setCompanyList] = useState([]);     //백엔드에서 받아온 데이터를 저장할   
    const [reqPage, setReqPage] = useState(1);              //요청 페이지    
    const [pageInfo, setPageInfo] = useState({});           //페이지 네비게이션
    
    const [sortConfig, setSortConfig] = useState({ key: 'regDate', direction: 'desc' }); //정렬을 위한 state


    useEffect(function(){
        //URL 뒤에 붙일 쿼리스트링
        const queryString = `?reqPage=${reqPage}&sortKey=${sortConfig.key}&sortDirection=${sortConfig.direction}`;

        let options = {};
        options.url = serverUrl + "/company/list" + queryString;
        options.method = 'get';
        
        //axios를 이용하여 백엔드 API 호출
        axios(options)
        .then(function(res){
            //성공 시, 불러온 데이터 state에 저장
            setCompanyList(res.data.companyList);          
            setPageInfo(res.data.pageInfo);
        })
        .catch(function(err){
            console.log(err)
        });

    }, [reqPage, sortConfig]);

    // 정렬 요청 함수
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setReqPage(1); // 정렬 시 1페이지로 이동
    };

    //구글 아이콘을 반환 함수
    const getSortIcon = (key) => {
        const iconName = sortConfig.key !== key ? 'unfold_more' // 기본 양방향 화살표
            : sortConfig.direction === 'asc' ? 'expand_less' // 위쪽 화살표
                : 'expand_more'; // 아래쪽 화살표
        return <span className="material-symbols-outlined">{iconName}</span>;
    };
    

    return (
        <div className="content-wrap">
            
            {/* 페이지 제목과 설명 */}
            <div className="content-header">
                <span className="content-title">고객사 관리</span>
                <span className="content-subtitle">전체 고객사 목록을 확인하고 관리합니다.</span>
                <button className="header-btn">신규 등록</button>
            </div>
            
            {/* 1. 필터 및 액션 카드 */}
            <div className="filter-card">
                <div className="filter-groups">
                    <div className="search-box">
                        {/* ... 검색창 ... */}
                    </div>
                    {/* [제안] 거래상태 필터 버튼 그룹 */}
                    <div className="filter-buttons">
                        <button>전체</button>
                        <button>거래 중</button>
                        <button>거래 중지</button>
                    </div>
                </div>
                <button className="header-btn">
                    <span className="material-symbols-outlined">add</span>
                    신규 등록
                </button>
            </div>

            {/* 2. 테이블 카드 */}
            <div className="table-card">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th><div className="sort-header" onClick={() => requestSort('compName')}>
                                회사명 {getSortIcon('compName')}
                            </div></th>
                            <th><div className="sort-header">유형</div></th>
                            <th><div className="sort-header">대표자명</div></th>
                            <th><div className="sort-header">연락처</div></th>
                            <th><div className="sort-header" onClick={() => requestSort('tradeStatus')}>
                                거래상태 {getSortIcon('tradeStatus')}
                            </div></th>
                            <th><div className="sort-header" onClick={() => requestSort('regDate')}>
                                최초등록일 {getSortIcon('regDate')}
                            </div></th>            
                        </tr>
                    </thead>
                    <tbody>
                        {companyList.map(function(company){                            
                            return <Company key={company.compCd} company={company} serverUrl={serverUrl}/>
                        })}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}            
            <div className="pagination">           
            <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>
        </div>
        
    );
};

function Company(props){
    const company = props.company    

    return(
        <tr>
            <td>{company.compName}</td>
            <td style={{ textAlign: 'center' }}>                
                {company.compType === 1 ?
                    <span className="type-badge type-corp">법인</span> :
                    <span className="type-badge type-indiv">개인</span>
                }
            </td>
            <td>{company.ownerName}</td>
            <td>{company.compTel}</td>
            <td style={{ textAlign: 'center' }}>                
                {company.tradeStatus === 1 ?
                    <span className="status-badge status-active">거래 중</span> :
                    <span className="status-badge status-inactive">거래 중지</span>
                }
            </td>
            <td>{company.regDate}</td>     
        </tr>
    );
}
