import "./CompanyList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "./companyCommon/PageNavi";
import CompanyInsertModal from "./CompanyInsertModal";


export default function CompanyList(){    
    
    const serverUrl = import.meta.env.VITE_BACK_SERVER;     //API 서버 주소 serverUrl에 저장    
    const [companyList, setCompanyList] = useState([]);     //백엔드에서 받아온 데이터를 저장할   
    const [reqPage, setReqPage] = useState(1);              //요청 페이지    
    const [pageInfo, setPageInfo] = useState({});           //페이지 네비게이션    
    const [sortConfig, setSortConfig] = useState({ key: 'regDate', direction: 'desc' }); //정렬을 위한 state    
    const [filterType, setFilterType] = useState('ALL');    //유형 (전체, 법인, 개인)
    const [filterStatus, setFilterStatus] = useState(0);    //거래상태 (전체, 거래 중, 거래 중지)
    const [searchTerm, setSearchTerm] = useState("");       //검색어
    const [isModalOpen, setIsModalOpen] = useState(false);  //신규 고객사 모달창 관리

    
    useEffect(function(){
        //URL 뒤에 붙일 쿼리스트링(필터값을 포함하고 있음.)
        const queryString = `?reqPage=${reqPage}&sortKey=${sortConfig.key}&sortDirection=${sortConfig.direction}&type=${filterType}&status=${filterStatus}&search=${searchTerm}`;

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

    }, [reqPage, sortConfig, filterType, filterStatus, searchTerm]); // 의존성 배열에 새 필터 추가


    // 정렬 요청 함수
    function requestSort(key){
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setReqPage(1); // 정렬 시 1페이지로 이동
    };

    //구글 아이콘을 반환 함수
    function getSortIcon(key){
        const iconName = sortConfig.key !== key ? 'unfold_more' // 기본 양방향 화살표
            : sortConfig.direction === 'asc' ? 'expand_less' // 위쪽 화살표
                : 'expand_more'; // 아래쪽 화살표
        return <span className="material-symbols-outlined">{iconName}</span>;
    };

    //검색어 변경을 처리하는 새로운 함수
    function handleSearchChange(e){
        // 1. 검색어 상태를 업데이트하고,
        setSearchTerm(e.target.value);
        // 2. 페이지 번호를 1로 초기화
        setReqPage(1);
    };  

    //신규 고객사 추가 모달 펑션 SET
    function openModal(){
        setIsModalOpen(true); //모달 상태를 true로 바꿔 화면에 렌더링
    }
    function closeModal(){
        setIsModalOpen(false); //모달 상태를 false로 바꿔 화면에서 숨기기
    }
    function reloadCompanyList(){
        setReqPage(1); // 1페이지로 이동시키면 useEffect가 자동으로 목록을 다시 불러옴.
    }   

    return (        
        <div className="content-wrap">
            
            {/* 페이지 제목과 설명 */}
            <div className="content-header">
                <span className="content-title">고객사 관리</span> 
                <span className="content-subtitle">전체 고객사 목록을 확인하고 관리합니다.</span>                
            </div>
            
            {/* 필터 및 액션 카드 */}
            <div className="filter-card">
                <div className="filter-controls">
                    {/* 검색창 */}
                    <div className="search-box">
                        <span className="material-symbols-outlined">search</span>
                        <input
                            type="text"
                            placeholder="고객사명 검색"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {/* 유형 필터 */}
                    <div className="select-group">
                        <label htmlFor="type-filter">사업자 유형</label>
                        <select id="type-filter" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="ALL">전체</option>
                            <option value="C">법인</option>
                            <option value="P">개인</option>
                        </select>
                    </div>
                    {/* 거래상태 필터 */}
                    <div className="select-group">
                        <label htmlFor="status-filter">거래상태</label>
                        <select id="status-filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value={0}>전체</option>
                            <option value={1}>거래 중</option>
                            <option value={2}>거래 중지</option>
                        </select>
                    </div>
                </div>
                {/* 신규 고객사 등록 버튼*/}
                <button className="header-btn" onClick={openModal}>
                    <span className="material-symbols-outlined">add</span>
                    신규 등록
                </button>
            </div>

            {/* 테이블 카드 */}
            <div className="table-card">
                <div className="table-card-inner">
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
            </div>

            {/* 페이지네이션 */}            
            <div className="pagination">           
                <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>

            {/*
            [핵심!] isModalOpen 상태가 true일 때만 CompanyInsertModal 컴포넌트를 화면에 보여줍니다.
            모달에게 필요한 도구(closeModal)와 정보(reloadCompanyList)를 소포(props)로 전달합니다.
            */}
            {isModalOpen && (
                <CompanyInsertModal
                    closeModal={closeModal}
                    reloadCompanyList={reloadCompanyList}
                />
            )}
        </div>
    );
};

function Company(props){
    const company = props.company    

    return(
        <tr>
            <td>{company.compName}</td>
            <td>                
                {company.compType == 'C' 
                   ? <span className="type-badge type-corp">법인</span>
                   : <span className="type-badge type-indiv">개인</span>
                }
            </td>
            <td>{company.ownerName}</td>
            <td>{company.compTel}</td>
            <td>                
                {company.tradeStatus == 1 
                   ? <span className="status-badge status-active">거래 중</span> 
                   : <span className="status-badge status-inactive">거래 중지</span>
                }
            </td>
            <td>{company.regDate}</td>     
        </tr>
    );
}
