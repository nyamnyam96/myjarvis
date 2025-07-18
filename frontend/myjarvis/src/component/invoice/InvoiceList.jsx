// src/component/invoice/InvoiceList.jsx (최종 수정본)

import "./InvoiceList.css";
import { useEffect, useState } from "react";
import PageNavi from "../company/companyCommon/PageNavi"; 
import createInstance from "../../axios/interceptor";
import useUserStore from "../../store/useUserStore";


export default function InvoiceList(){
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();
    const { loginMember } = useUserStore();

    const [invoiceList, setInvoiceList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: 'regDate', direction: 'desc' });
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refetchKey, setRefetchKey] = useState(0);

    useEffect(() => {
        // [핵심 1] 로그인 아이디가 있는지 확인. 없으면 API 호출 자체를 막음.
        const memberId = loginMember?.memberId; // 옵셔널 체이닝으로 안전하게 접근
        if (!memberId) {
            return; 
        }

        const queryString = `?reqPage=${reqPage}&sortKey=${sortConfig.key}&sortDirection=${sortConfig.direction}&status=${filterStatus}&search=${searchTerm}&memberId=${memberId}`;
        const url = `${serverUrl}/invoice/list${queryString}`;
        
        axiosInstance.get(url)
            .then(res => {
                setInvoiceList(res.data.invoiceList);
                setPageInfo(res.data.pageInfo || {});
            })
            .catch(err => {
                console.error(err);
            });

    // [핵심 2] loginMember 객체가 아닌, loginMember.memberId 문자열 값의 변경을 감시합니다.
    }, [reqPage, sortConfig, filterStatus, searchTerm, refetchKey, loginMember?.memberId]);


    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setReqPage(1);
    };

    const getSortIcon = (key) => {
        const iconName = sortConfig.key !== key ? 'unfold_more' 
            : sortConfig.direction === 'asc' ? 'expand_less' 
            : 'expand_more';
        return <span className="material-symbols-outlined">{iconName}</span>;
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setReqPage(1);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const reloadList = () => setRefetchKey(prevKey => prevKey + 1);

    return (
        <div className="content-wrap">
            <div className="content-header">
                <span className="content-title">청구 관리</span>
                <span className="content-subtitle">전체 청구 목록을 확인하고 관리합니다.</span>
            </div>
            
            <div className="filter-card">
                <div className="filter-controls">
                    <div className="search-box">
                        <span className="material-symbols-outlined">search</span>
                        <input
                            type="text"
                            placeholder="고객사명, 계약명 검색"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
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
                <button className="header-btn" onClick={openModal}>
                    <span className="material-symbols-outlined">add</span>
                    청구 등록
                </button>
            </div>

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
                            {invoiceList.map(invoice => (
                                <InvoiceRow key={invoice.invoiceNo} invoice={invoice}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="pagination">
                <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>
            
            {/* 추후 청구 등록 모달(InvoiceInsertModal)로 교체 필요 */}
            {/* {isModalOpen && <InvoiceInsertModal closeModal={closeModal} reloadList={reloadList} />} */}
        </div>
    );
};


function InvoiceRow({ invoice }) {
    const getStatusInfo = (statusCode) => {
        switch(statusCode) {
            case 'P': return { className: 'status-draft', text: '발송 전' };
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