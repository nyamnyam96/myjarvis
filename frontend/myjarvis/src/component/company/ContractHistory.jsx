import { useState, useEffect } from "react";
import createInstance from "../../axios/interceptor";
import { Link } from "react-router-dom";
import "./ContractHistory.css"; // 전용 CSS 파일도 생성

export default function ContractHistory({ compCd }) {
  const serverUrl = import.meta.env.VITE_BACK_SERVER;
  const axiosInstance = createInstance();
  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    // compCd가 있을 때만 API를 호출
    if (compCd) {
      axiosInstance
        .get(`${serverUrl}/contract/company/${compCd}`)
        .then((res) => {
          setContractList(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [compCd]); // compCd가 변경될 때마다 다시 불러옴

  if (contractList.length === 0) {
    return <div className="no-history">계약 이력이 없습니다.</div>;
  }

  return (
    <div className="table-card-inner">
      <table className="styled-table">
        <thead>
          <tr>
            <th>계약명</th>
            <th>계약금액</th>
            <th>계약기간</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {contractList.map((contract) => (
            <ContractRow key={contract.contractNo} contract={contract} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContractRow({ contract }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'T':
        return <span className="status-badge status-prep">초안</span>;
      case 'W':
        return <span className="status-badge status-progress">진행</span>;
      case 'C':
        return <span className="status-badge status-done">완료</span>;
      case 'X':
        return <span className="status-badge status-cancel">취소</span>;
      default:
        return <span className="status-badge status-prep">{status}</span>;
    }
  };

  //contract.contractDeposit 값이 없거나 null일 경우를 대비해 기본값 0을 설정
  const deposit = contract.contractDeposit ?? 0;

  return (
    // 각 계약을 클릭하면 해당 계약의 상세 페이지로 이동
    <tr className="history-row">
        <td>
            <Link to={`/main/contract/${contract.contractNo}`} className="table-link">
                {contract.contractTitle}
            </Link>
        </td>
        <td>{deposit.toLocaleString()}원</td>
        <td>{`${contract.contractStart} ~ ${contract.contractEnd}`}</td>
        <td>{getStatusBadge(contract.statusCode)}</td>
    </tr>
  );
}