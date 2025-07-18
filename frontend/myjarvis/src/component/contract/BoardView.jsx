import "./ContractList.css";
import { useNavigate } from "react-router-dom";


function ContractCard({ contract, onCardClick, navigate }) {
    
    function goToDetail(e) {
        // 이벤트 버블링을 막아 부모(카드)의 onClick이 실행되지 않도록 함
        e.stopPropagation(); 
        navigate(`/main/contract/${contract.contractNo}`);
    };

    return (
        // 카드를 클릭하면, 부모에게서 받은 onCardClick 함수를 호출합니다.
        <div className="contract-card" onClick={() => onCardClick(contract)}>
            <h4 className="card-title clickable-title" onClick={goToDetail}>{contract.contractTitle}</h4>
            <div className="card-info-row">
                <span className="info-label">고객사</span>
                <span className="info-value">{contract.companyName}</span>
            </div>
            <div className="card-info-row">
                <span className="info-label">계약금액</span>
                <span className="info-value">
                    {contract.contractDeposit != null 
                        ? contract.contractDeposit.toLocaleString() + '원' 
                        : '금액 미지정'}
                </span>
            </div>
            <div className="card-info-row">
                <span className="info-label">계약기간</span>
                <span className="info-value date">{contract.contractStart} ~ {contract.contractEnd}</span>
            </div>
        </div>
    );
}


export default function BoardView({contractList, onCardClick }) {

    const navigate = useNavigate();
    
    // 계약 상태별로 컬럼을 정의
    const statuses = [
        { code: 'T', title: '초안' },
        { code: 'W', title: '진행(대기)' },
        { code: 'C', title: '완료(확정)' },
        { code: 'X', title: '취소' }
    ];

    // 상태(statusCode)별로 계약 목록을 그룹화하는 함수
    const getContractsByStatus = (statusCode) => {
        return contractList.filter(c => c.statusCode === statusCode);
    };    

    return (
        <div className="board-view">
            {statuses.map((status) => (
                <div key={status.code} className="board-column">
                    <div className="column-header">
                        <span className={`status-dot ${status.code}`}></span>
                        <h3 className="column-title">{status.title}</h3>
                        <span className="column-count">{getContractsByStatus(status.code).length}</span>
                    </div>
                    <div className="column-body">
                        {getContractsByStatus(status.code).map((contract) => (
                            <ContractCard key={contract.contractNo} contract={contract} onCardClick={onCardClick} navigate={navigate} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

