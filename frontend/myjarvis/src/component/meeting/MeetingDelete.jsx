import React from "react";

// props: id(삭제할 회의 id), onDelete(삭제 함수), onCancel(취소 함수)
function MeetingDelete({ id, onDelete, onCancel }) {
  return (
    <div className="meeting-delete-modal">
      <div className="meeting-delete-content">
        <h4>회의록 삭제</h4>
        <p>정말 삭제하시겠습니까?</p>
        <div className="meeting-delete-btns">
          <button className="meeting-delete-confirm" onClick={() => onDelete(id)}>삭제</button>
          <button className="meeting-delete-cancel" onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default MeetingDelete;
