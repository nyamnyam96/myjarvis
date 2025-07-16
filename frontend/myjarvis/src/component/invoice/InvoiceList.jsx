import "./InvoiceList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../company/companyCommon/PageNavi"; 
import createInstance from "../../axios/interceptor";
import useUserStore from "../../store/useUserStore";
// import CompanyInsertModal from "./CompanyInsertModal"; // 청구 등록 모달로 변경 필요


export default function InvoiceList(){        
    const serverUrl = import.meta.env.VITE_BACK_SERVER;     //API 서버 주소 serverUrl에 저장    
    const axiosInstance = createInstance();                 //중요!! interceptor에서 만들어놓은 axios
    const {loginMember} = useUserStore();

    const [invoiceList, setInvoiceList] = useState([]);     //백엔드에서 받아온 데이터를 저장할   
    const [reqPage, setReqPage] = useState(1);              //요청 페이지    
    const [pageInfo, setPageInfo] = useState({});           //페이지 네비게이션    
    const [sortConfig, setSortConfig] = useState({ key: 'regDate', direction: 'desc' }); //정렬을 위한 state      
    const [filterStatus, setFilterStatus] = useState('ALL');    //청구상태 
    const [searchTerm, setSearchTerm] = useState("");       //검색어
    const [isModalOpen, setIsModalOpen] = useState(false);  //신규 고객사 모달창 관리
    const [refetchKey, setRefetchKey] = useState(0);        //목록을 다시 불러오는 역할만 하는 "새로고침 키" 상태        

    
    
    useEffect(function(){
        //URL 뒤에 붙일 쿼리스트링(필터값을 포함하고 있음.)
        const queryString = `?reqPage=${reqPage}&sortKey=${sortConfig.key}&sortDirection=${sortConfig.direction}&status=${filterStatus}&search=${searchTerm}&memberNo=${loginMember.memberNo}`;

        let options = {};
        options.url = serverUrl + "/invoice/list" + queryString;
        options.method = 'get';
        
        //axios를 이용하여 백엔드 API 호출
        axiosInstance(options)
        .then(function(res){
            //성공 시, 불러온 데이터 state에 저장
            setInvoiceList(res.data.invoiceList);          
            setPageInfo(res.data.pageInfo);
        })
        .catch(function(err){
            console.log(err)
        });      

    }, [reqPage, sortConfig, filterStatus, searchTerm,refetchKey]); // 의존성 배열


    // 정렬 요청 함수
    function requestSort(key){
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setReqPage(1); // 정렬 시 1페이지로 이동
    };

    //(정렬 기능) 구글 아이콘을 반환 함수
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
    function reloadList (){
        setRefetchKey(prevKey => prevKey + 1); // 'refetchKey' 값을 1씩 증가시키도록 수정(고객사 등록 후 새로고침)
    }    
  
    return (        
        <div className="content-wrap">
            
            {/* 페이지 제목과 설명 */}
            <div className="content-header">
                <span className="content-title">청구 관리</span> 
                <span className="content-subtitle">전체 청구 목록을 확인하고 관리합니다.</span>                
            </div>
            
            {/* 필터 및 액션 카드 */}
            <div className="filter-card">
                <div className="filter-controls">
                    {/* 검색창 */}
                    <div className="search-box">
                        <span className="material-symbols-outlined">search</span>
                        <input
                            type="text"
                            placeholder="고객사명, 계약명 검색"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>                    
                    {/* 청구상태 필터 */}
                    <div className="select-group">
                        <label htmlFor="status-filter">청구상태</label>
                        <select id="status-filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="All">전체</option>
                            <option value="P">발송 전</option>
                            <option value="U">미납</option>
                            <option value="O">기한초과</option>
                            <option value="C">납부완료</option>
                        </select>
                    </div>
                </div>
                {/* 신규 고객사 등록 버튼*/}
                <button className="header-btn" onClick={openModal}>
                    <span className="material-symbols-outlined">add</span>
                    청구 등록
                </button>
            </div>

            {/* 테이블 카드 */}
            <div className="table-card">
                <div className="table-card-inner">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th><div className="sort-header">청구번호</div></th>
                                <th><div className="sort-header" onClick={() => requestSort('companyName')}>고객사 {getSortIcon('companyName')}</div></th>
                                <th><div className="sort-header">계약명</div></th>
                                <th><div className="sort-header" onClick={() => requestSort('invoiceDeposit')}>청구금액 {getSortIcon('invoiceDeposit')}</div></th>
                                <th><div className="sort-header" onClick={() => requestSort('regDate')}>생성일 {getSortIcon('regDate')}</div></th>
                                <th><div className="sort-header">납기일</div></th>
                                <th><div className="sort-header">청구상태</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceList.map(function(invoice){                            
                                return <InvoiceRow key={invoice.invoiceNo} invoice={invoice}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 페이지네이션 */}            
            <div className="pagination">           
                <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>

        </div>
    );
};


function InvoiceRow({ invoice }) {
    // 청구 상태 코드에 따라 뱃지 스타일과 텍스트를 반환하는 함수
    const getStatusInfo = (statusCode) => {
        switch(statusCode) {
            case 'P': return { className: 'status-before-send', text: '발송 전' };
            case 'U': return { className: 'status-unpaid', text: '미납' };
            case 'O': return { className: 'status-overdue', text: '기한초과' };
            case 'C': return { className: 'status-completed', text: '납부완료' };
            default: return { className: '', text: '알 수 없음' };
        }
    };
    const status = getStatusInfo(invoice.invoiceStatusCode);

    return (
        <tr>
            <td>{invoice.invoiceNo}</td>
            <td>{invoice.companyName}</td>
            <td>{invoice.contractTitle}</td>
            <td>{invoice.invoiceDeposit.toLocaleString()} 원</td>
            <td>{invoice.regDate}</td>
            <td>{invoice.invoiceSend}</td>
            <td>
                <span className={`status-badge ${status.className}`}>{status.text}</span>
            </td>
        </tr>
    );
}
