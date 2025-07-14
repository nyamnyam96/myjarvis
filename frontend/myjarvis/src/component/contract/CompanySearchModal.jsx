import { useEffect, useState } from 'react';
import createInstance from '../../axios/interceptor';
import './CompanySearchModal.css'; // 모달 전용 CSS

export default function CustomerSearchModal({ onSelect, closeModal }) {
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();
    
    const [companyList, setCompanyList] = useState([]);    
    const [searchTerm, setSearchTerm] = useState('');

    // 컴포넌트가 열리거나, 검색어가 바뀔 때마다 고객사 목록을 다시 불러옴
    useEffect(() => {
        // 검색어가 포함된 API 주소
        const url = `${serverUrl}/company/search?searchName=${searchTerm}`;

        axiosInstance.get(url)
            .then(res => {
                setCompanyList(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [searchTerm]);

    // 고객사 선택 시 실행되는 함수
    const handleSelect = (company) => {
        onSelect(company); // 부모에게 선택된 고객사 정보를 전달
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content customer-search-modal">
                <div className="modal-header">
                    <h2>고객사 검색</h2>
                    <button onClick={closeModal} className="close-btn">×</button>
                </div>
                <div className="modal-body">
                    {/* 검색창 */}
                    <div className="search-box-modal">
                        <input
                            type="text"
                            placeholder="고객사명으로 검색하세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    
                    {/* 고객사 목록 */}
                    <div className="customer-list-container">
                        <table className="customer-search-table">
                            <thead>
                                <tr>
                                    <th>상호명</th>
                                    <th>대표자명</th>
                                    <th>연락처</th>
                                    <th>선택</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyList.length > 0 ? (
                                    companyList.map(company => (
                                        <tr key={company.compCd}>
                                            <td>{company.compName}</td>
                                            <td>{company.ownerName}</td>
                                            <td>{company.compTel}</td>
                                            <td>
                                                <button 
                                                    className="btn-select" 
                                                    onClick={() => handleSelect(company)}
                                                >
                                                    선택
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="no-result">검색 결과가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}