import React, { useState } from "react";

function MeetingUpdate({ meeting, onUpdated }) {
  const [editContent, setEditContent] = useState(meeting.content || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);

    const body = {
      meetingNo: meeting.id,       // PK 반드시 필요
      meetContent: editContent,    // 수정된 내용
    };

    try {
      const res = await fetch("/api/meetings/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        if (onUpdated) onUpdated(body);
        alert("회의 내용 수정 완료");
      } else {
        alert("수정 실패 (서버 오류)");
      }
    } catch (e) {
      alert("수정 실패 (네트워크 오류)");
    }
    setSaving(false);
  };

  return (
    <div>
      <textarea
        value={editContent}
        onChange={e => setEditContent(e.target.value)}
        rows={5}
      />
      <button onClick={handleUpdate} disabled={saving}>
        {saving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}

export default MeetingUpdate;
