import React from "react";
import "./MyScheduleModal.css";

const MyScheduleModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>새로운 일정 등록</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="modal-body modal-body-scrollable">
          <div className="form-section">
            <div className="form-grid">
              <div className="form-group">
                <label>제목 <span>*</span></label>
                <input type="text" placeholder="예: 계약 미팅" />
              </div>
              <div className="form-group">
                <label>유형</label>
                <select>
                  <option value="contract">계약</option>
                  <option value="meeting">미팅</option>
                </select>
              </div>
              <div className="form-group">
                <label>시작일 <span>*</span></label>
                <input type="datetime-local" />
              </div>
              <div className="form-group">
                <label>종료일</label>
                <input type="datetime-local" />
              </div>
              <div className="form-group full-width">
                <label>설명</label>
                <input type="text" placeholder="일정에 대한 메모를 작성하세요" />
              </div>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>취소</button>
          <button className="btn-primary">등록</button>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleModal;
