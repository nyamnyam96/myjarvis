import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createInstance from '../../axios/interceptor';
import useUserStore from '../../store/useUserStore';
import Swal from 'sweetalert2';

export default function ContractInsert() {
    const navigate = useNavigate();
    const axiosInstance = createInstance();
    const { loginMember } = useUserStore();

    const [contract, setContract] = useState({
        contractTitle: '',
        contractContent: '',
        contractStart: '',
        contractEnd: '',
        contractDeposit: 0,
    });
    
    // 선택된 고객사를 관리할 state
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleContractChange = (e) => {
        const { name, value } = e.target;
        setContract(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = () => {
        // 유효성 검사
        if (!selectedCompany || !contract.contractTitle) {
            Swal.fire('입력 오류', '계약명과 고객사는 필수입니다.', 'warning');
            return;
        }

        const finalData = {
            ...contract,
            memberNo: loginMember.memberNo, // "누가" 등록했는지 정보 추가
            partyList: [{ // 계약 당사자 정보 추가
                compCd: selectedCompany.compCd,
                memberNo: loginMember.memberNo,
                role: '당사자'
            }]
        };

        axiosInstance.post('/contract', finalData)
            .then(res => {
                if (res.data > 0) {
                    Swal.fire('등록 성공', '신규 계약이 등록되었습니다.', 'success');
                    navigate('/contract/list'); // 등록 성공 시 목록으로 이동
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="content-wrap">
            <div className="content-header">
                <span className="content-title">신규 계약 등록</span>
            </div>
            
            {/* 여기에 고객사 검색 기능, 계약 정보 입력 폼 등 UI를 구성합니다. */}
            {/* ... */}

            <div className="form-actions">
                <button type="button" onClick={() => navigate(-1)}>취소</button>
                <button type="button" onClick={handleSubmit}>등록</button>
            </div>
        </div>
    );
}