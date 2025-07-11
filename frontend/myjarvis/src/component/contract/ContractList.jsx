import { useEffect, useState } from "react";
import createInstance from "../../axios/interceptor";
import "./ContractList.css";
import PageNavi from "../company/companyCommon/PageNavi";

export default function ContractList() {

  const serverUrl = import.meta.env.VITE_BACK_SERVER;
  const axiosInstance = createInstance();
  const [contractList, setContractList] = useState([]);  
  const [reqPage, setReqPage] = useState(1);              //요청 페이지
  const [pageInfo, setPageInfo] = useState({});           //페이지 네비게이션
  
  useEffect(function(){

    //URL 뒤에 붙일 쿼리 스트링(필터값!!)
    const queryString = `?reqPage=${reqPage}`

    let options = {};
    options.url = serverUrl + "/contract/list" + queryString;
    options.method = 'get';

    axiosInstance(options) //백엔드 API 호출
      .then(function(res){
        console.log("서버로부터 받은 응답:", res.data);

        setContractList(res.data.contractList); 
        setPageInfo(res.data.pageInfo);       
      })
      .catch(function(err){
        console.error(err);
      });

  }, [reqPage]); 


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
                    <button className="view-btn active">
                        <span className="material-symbols-outlined">grid_view</span>
                    </button>
                    <button className="view-btn">
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
                    <button className="header-btn">
                        <span className="material-symbols-outlined">add</span>
                        신규 계약
                    </button>
                </div>
            </div>
        </div>

        {/* 테이블 카드 */}
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
                            return <ContractRow key={contract.contractNo} contract={contract} serverUrl={serverUrl} />
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
}

// 각 계약 데이터를 테이블 행(row)으로 변환
function ContractRow({contract}) {

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

  return (
      <tr>
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
