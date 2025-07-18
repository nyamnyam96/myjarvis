import { useEffect, useState } from "react";
import createInstance from "../../axios/interceptor";
import "./ContractList.css";
import PageNavi from "../company/companyCommon/PageNavi";
import BoardView from "./BoardView";
import StatusChangeModal from "./StatusChangeModal";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";


// 각 계약 데이터를 테이블 행(row)으로 변환
function ContractRow({contract, navigate}) {

  // 상태 코드에 따라 클래스와 텍스트를 반환하는 함수
  const getStatusInfo = (statusCode) => {
      switch(statusCode) {
          case 'T': return { className: 'status-draft', text: '초안' };
          case 'W': return { className: 'status-progress', text: '진행' };
          case 'C': return { className: 'status-completed', text: '완료' };
          case 'X': return { className: 'status-canceled', text: '취소' };
          default: return { className: '', text: '알 수 없음' };
      }
  };

  const status = getStatusInfo(contract.statusCode);
  const goToDetail = () => {
    navigate(`/main/contract/${contract.contractNo}`);
  }; 

  return (
      <tr onClick={goToDetail} style={{ cursor: 'pointer' }}>
          <td>{contract.contractTitle}</td>
          <td>{contract.companyName}</td>
          <td>{contract.memberName}</td>
          <td>{contract.contractDeposit.toLocaleString()}원</td>
          <td>{contract.contractStart} ~ {contract.contractEnd}</td>
          <td>
              <span className={`status-badge ${status.className}`}>
                  {status.text}
              </span>
          </td>
      </tr>
  );    
}


export default function ContractList() {

  const serverUrl = import.meta.env.VITE_BACK_SERVER;
  const axiosInstance = createInstance();
  const {loginMember} = useUserStore();


  const [contractList, setContractList] = useState([]);  
  const [reqPage, setReqPage] = useState(1);              //요청 페이지
  const [pageInfo, setPageInfo] = useState({});           //페이지 네비게이션
  const [viewMode, setViewMode] = useState('board');      //현재 뷰모드를 저장하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const navigate = useNavigate();
  
  function goToInsert(){
    navigate('/main/contract/new');
  }
    
  // 보드뷰와 테이블뷰 리로드 펑션
  function reloadList(){    
    const url = serverUrl + "/contract/list";
    let queryString = `?memberNo=${loginMember.memberNo}`;

    if (viewMode === 'table') {
        queryString += `&reqPage=${reqPage}`;
    }  
    console.log("API 요청 URL:", url + queryString);

    axiosInstance(url + queryString) //백엔드 API 호출
      .then(function(res){    
        setContractList(res.data.contractList); 
        setPageInfo(res.data.pageInfo || {});      
      })
      .catch(function(err){
        console.error(err);
      });        
  };
  
  // 모달을 여는 함수
  const openStatusModal = (contract) => {
      setSelectedContract(contract);
      setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
      setIsModalOpen(false);
      setSelectedContract(null);
  };
  

  useEffect(function(){
    reloadList();
  }, [viewMode, reqPage]); 


  return (    
    <div className="content-wrap">

        {/* 페이지 제목과 설명 */}
        <div className="content-header">
            <span className="content-title">계약 관리</span>
            <span className="content-subtitle">전체 계약 목록을 확인하고 관리합니다.</span>
        </div>

        {/* 필터 및 액션 카드 */}
        <div className="filter-card">            
            <div className="filter-controls">              
                {/* 칸반/테이블 뷰 전환 버튼 */}
                <div className="view-switcher">
                        <button
                            className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
                            onClick={() => setViewMode('board')}>
                            <span className="material-symbols-outlined">view_week</span>
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                            onClick={() => setViewMode('table')}>
                            <span className="material-symbols-outlined">table_rows</span>
                        </button>                        
                </div>

                {/* 검색창 */}
                <div className="search-box">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="계약명, 고객사명 검색" />
                </div>

                {/* 상태 필터 */}
                <div className="select-group">
                    <label htmlFor="status-filter">상태</label>
                    <select id="status-filter">
                        <option value="ALL">전체</option>
                        <option value="DRAFT">초안</option>
                        <option value="IN_PROGRESS">진행</option>
                        <option value="COMPLETED">완료</option>
                        <option value="CANCELED">취소</option>
                    </select>
                </div>

            </div>

            <div className="action-buttons">                
                {/* 신규 계약 등록 버튼 */}
                <div className="addBtn">
                    <button className="header-btn" onClick={goToInsert}>
                        <span className="material-symbols-outlined">add</span>
                        신규 계약
                    </button>
                </div>
            </div>
        </div>

        {/* 테이블 카드 */}
        {viewMode === 'board' 
        ? 
            (
                <BoardView contractList={contractList} onCardClick={openStatusModal} />
            ) 
        : 
            (
                <div className="table-card">
                    <div className="table-card-inner">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>계약명</th>
                                    <th>고객사</th>
                                    <th>담당자</th>
                                    <th>계약금액</th>
                                    <th>계약기간</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contractList.map(function(contract){
                                    return <ContractRow key={contract.contractNo} contract={contract} navigate={navigate} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}            

        {/* 페이지네이션 */}
        {viewMode === 'table' && (
        <div className="pagination">
           <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />                        
        </div>
        )}

        {isModalOpen && (
                <StatusChangeModal
                    contract={selectedContract}
                    closeModal={closeModal}
                    reloadList={reloadList}
                />
        )}

    </div>

  );  
}


