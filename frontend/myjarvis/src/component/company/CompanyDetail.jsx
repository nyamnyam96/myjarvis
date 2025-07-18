import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import createInstance from "../../axios/interceptor";
import Swal from "sweetalert2";
import "./CompanyDetail.css";
import ContractHistory from "./ContractHistory";

export default function CompanyDetail() {
  const serverUrl = import.meta.env.VITE_BACK_SERVER;  
  const axiosInstance = createInstance();
  const { compCd } = useParams(); // URL에서 compCd 추출
  const navigate = useNavigate();

  const [company, setCompany] = useState(null); // 회사 기본 정보
  const [members, setMembers] = useState([]); // 담당자 목록
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [activeTab, setActiveTab] = useState("info"); // 'info', 'contract' 등 탭 상태 관리

  // 최초 로딩 시 데이터 불러오기
  useEffect(() => {
    axiosInstance
      .get(`${serverUrl}/company/${compCd}`)
      .then((res) => {
        setCompany(res.data.company);
        setMembers(res.data.companyMembers || []);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(
          "오류",
          "데이터를 불러오는 중 문제가 발생했습니다.",
          "error"
        );
      });
  }, [compCd]);

  // 수정 모드 토글
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // 저장 버튼 클릭
  const handleSave = () => {
    const finalData = { ...company, companyMembers: members };
    axiosInstance
      .put(`${serverUrl}/company/update`, finalData)
      .then((res) => {
        if (res.data > 0) {
          Swal.fire("성공", "고객사 정보가 저장되었습니다.", "success");
          setIsEditing(false); // 저장 후 보기 모드로 전환
        } else {
          Swal.fire("실패", "정보 저장에 실패했습니다.", "error");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("오류", "서버 통신 중 오류가 발생했습니다.", "error");
      });
  };

  // 삭제 버튼 클릭
  const handleDelete = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "해당 고객사와의 거래를 중지 처리합니다. (데이터는 보존됩니다)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`${serverUrl}/company/delete/${compCd}`)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire(
                "삭제 완료",
                "고객사가 거래 중지 처리되었습니다.",
                "success"
              );
              navigate("/company/list"); // 목록으로 이동
            } else {
              Swal.fire("삭제 실패", "처리 중 오류가 발생했습니다.", "error");
            }
          });
      }
    });
  };

  // 기본 정보 input 변경 핸들러
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  // 담당자 정보 input 변경 핸들러
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };
  
  // 담당자 추가
  const addMemberRow = () => {
    setMembers([
      ...members,
      {
        contactName: "",
        contactDept: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: "",
      },
    ]);
  };

  // 담당자 삭제
  const removeMemberRow = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };
  
  // 로딩 중일 때 표시
  if (!company) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="content-wrap company-detail-wrap">    
      {/* 1. 헤더 영역 */}
      <div className="detail-header">
        <div className="detail-title-box">
          <span className="detail-title">{company.compName}</span>
        </div>
        <div className="detail-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="action-btn save-btn">저장</button>
              <button onClick={handleEditToggle} className="action-btn cancel-btn">취소</button>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined icon-btn" onClick={handleEditToggle}>edit</span>
              <span className="material-symbols-outlined icon-btn" onClick={handleDelete}>block</span>
            </>
          )}
        </div>
      </div>

      {/* 2. 탭 영역 */}
      <div className="detail-tabs">
        <button className={`tab-item ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>기본정보</button>
        <button className={`tab-item ${activeTab === "contract" ? "active" : ""}`} onClick={() => setActiveTab("contract")}>계약 이력</button>
        {/* <button className="tab-item">회의 이력</button> */}
        {/* <button className="tab-item">청구 이력</button> */}
      </div>

      {/* 3. 컨텐츠 영역 */}
      <div className="detail-content">

        {activeTab === "info" && ( 
          <>
            {/* 고객사 정보 카드 */}      
            <div className="info-card">
              <div className="info-card-header">
                <h4>고객사 정보</h4>
              </div>
              <div className="info-card-body grid-3">
                <InfoItem label="상호" value={company.compName} name="compName" isEditing={isEditing} onChange={handleCompanyChange} />
                <InfoItem label="대표자" value={company.ownerName} name="ownerName" isEditing={isEditing} onChange={handleCompanyChange} />
                <InfoItem label="연락처" value={company.compTel} name="compTel" isEditing={isEditing} onChange={handleCompanyChange} />
                <InfoItem label="주소" value={company.compAddr} name="compAddr" isEditing={isEditing} onChange={handleCompanyChange} />
                <InfoItem label="사업자 유형" value={company.compType === 'C' ? '법인' : '개인'} name="compType" isEditing={isEditing} onChange={handleCompanyChange} type="select" />
                <InfoItem label="사업자 번호" value={company.compNo} name="compNo" isEditing={isEditing} onChange={handleCompanyChange} />
              </div>
            </div>
            {/* 담당자 정보 카드 */}
            <div className="info-card">
              <div className="info-card-header">
                <h4>담당자 정보</h4>
                {isEditing && (
                  <button onClick={addMemberRow} className="add-contact-btn">
                    <span className="material-symbols-outlined">add</span>
                    담당자 추가
                  </button>
                )}
              </div>
              <div className="contact-list-container">
                {members.map((member, index) => (
                  <ContactItem
                    key={index}
                    index={index}
                    member={member}
                    isEditing={isEditing}
                    onChange={handleMemberChange}
                    onRemove={removeMemberRow}
                  />
                ))}
                {members.length === 0 && (
                    <p className="no-data-msg">
                      {isEditing ? "오른쪽 상단 '담당자 추가' 버튼을 눌러 새 담당자를 등록하세요." : "등록된 담당자 정보가 없습니다."}
                    </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* '계약 이력' 탭이 활성화되었을 때만 계약 이력 컴포넌트 표시 */}
        {activeTab === "contract" && (
          <div className="info-card">
            <div className="info-card-header">
              <h4>계약 이력</h4>
            </div>
            <ContractHistory compCd={compCd} />
          </div>
        )}            
      </div>
    </div>
  );
}

// 고객사 정보 항목 컴포넌트
function InfoItem({ label, value, name, isEditing, onChange, type = 'text', className = '' }) {
    const itemClassName = `info-item ${className}`;
    if (isEditing) {
        if (type === 'select') {
            return (
                <div className="info-item">
                    <label>{label}</label>
                    <select name={name} value={value === '법인' ? 'C' : 'P'} onChange={onChange}>
                        <option value="C">법인</option>
                        <option value="P">개인</option>
                    </select>
                </div>
            );
        }
        if(type === 'textarea'){
          return (
              <div className={itemClassName}>
                  <label>{label}</label>
                  <textarea name={name} value={value} onChange={onChange} rows={2}></textarea>
              </div>
          );
        }
        return (
            <div className={itemClassName}>
                <label>{label}</label>
                <input type="text" name={name} value={value} onChange={onChange} />
            </div>
        );
    }
    return (
        <div className={itemClassName}>
            <label>{label}</label>
            <span>{value}</span>
        </div>
    );
}

// 담당자 정보 항목 컴포넌트
function ContactItem({ index, member, isEditing, onChange, onRemove }) {
  if (isEditing) {
    return (
      <div className="contact-item-edit">
        <input type="text" name="contactName" placeholder="이름" value={member.contactName} onChange={(e) => onChange(index, e)} />
        <input type="text" name="contactDept" placeholder="부서" value={member.contactDept} onChange={(e) => onChange(index, e)} />
        <input type="text" name="contactPosition" placeholder="직책" value={member.contactPosition} onChange={(e) => onChange(index, e)} />
        <input type="text" name="contactPhone" placeholder="연락처" value={member.contactPhone} onChange={(e) => onChange(index, e)} />
        <input type="email" name="contactEmail" placeholder="이메일" value={member.contactEmail} onChange={(e) => onChange(index, e)} />
        <button onClick={() => onRemove(index)} className="remove-contact-btn">삭제</button>
      </div>
    );
  }
  return (
    <div className="contact-item-view">
      <div className="contact-main-info">
        <span className="contact-name">{member.contactName}</span>
        <span className="contact-position">{member.contactDept} / {member.contactPosition}</span>
        <span className="contact-dept"></span>
      </div>
      <div className="contact-sub-info">
        <div className="contact-detail-row">
            <span className="material-symbols-outlined">call</span>
            <span>{member.contactPhone || '미입력'}</span>
        </div>
        <div className="contact-detail-row">
            <span className="material-symbols-outlined">mail</span>
            <span>{member.contactEmail || '미입력'}</span>
        </div>
      </div>
    </div>
  );
}