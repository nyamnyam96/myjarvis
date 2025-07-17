/**
 * MeetingList.jsx
 * - 회의 목록을 불러오고, 상세/수정/태그/삭제 등 회의 관리 기능 제공
 * - meetings: 회의 데이터 배열
 * - setMeetings: 회의 데이터 상태 변경 함수
 * - setTab: 상위 탭 전환 함수
 * - selected: 선택된 회의
 * - setSelected: 선택 회의 변경 함수
 * - scrollToId: 특정 회의로 스크롤 이동
 */
import React, { useEffect, useRef, useState } from "react";
import SumAndMakeTag from "./SumAndMakeTag";
import "./MeetingList.css";

/*
  태그 기반 필터, 고객사별 보기

  - 태그 다중 선택  
  - 태그 자동 완성 입력
  - 필터 초기화 버튼
  - 고객사 선택 드롭 다운
  - 고객사별 회의 리스트 출력
  - 회의 요약 / 태그 미리보기

*/

function MeetingList({
  meetings: meetings,
  setMeetings,
  setTab,
  selected,
  setSelected,
  scrollToId,
}) {
  // 각 회의 li에 ref를 연결
  const itemRefs = useRef({});
  const [localMeetings, setLocalMeetings] = useState([]);

  // DB에서 회의록 불러오기 (최초 1회)
  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch("/api/meetings");
        // 500 에러 발생 시, 백엔드 API의 문제일 수 있습니다.
        if (res.ok) {
          const result = await res.json();
          const rawMeetings = result.resData;

          // ⚠️ null 제외 + 매핑
          const data = Array.isArray(rawMeetings)
            ? rawMeetings
                .filter((m) => m)
                .map((m) => ({
                  id: m.meetingNo,
                  memberNo: m.memberNo,
                  title: m.meetTitle,
                  content: m.meetContent,
                  date: m.meetDate,
                  summary: m.gptSummary,
                  tags: [], // 초기값 설정 (백엔드에 없으므로)
                }))
            : [];

          setLocalMeetings(data);
          if (setMeetings) setMeetings(data); // 상위에도 동기화
        } else {
          // 서버에서 에러 응답 시 메시지 출력
          const errorText = await res.text();
          console.error("서버 오류:", res.status, errorText);
          alert("회의 목록을 불러오는 중 서버 오류가 발생했습니다.");
        }
      } catch (e) {
        // 네트워크 에러 등
        console.error("네트워크 오류:", e);
        alert("회의 목록을 불러오는 중 네트워크 오류가 발생했습니다.");
      }
    }
    fetchMeetings(); // <-- 이 부분에서 500 에러가 발생 (백엔드 API 점검 필요)
  }, []);

  // 외부에서 selected가 바뀌면 상세 포커스 및 스크롤 이동
  useEffect(() => {
    if (selected && itemRefs.current[selected.id]) {
      itemRefs.current[selected.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (selected && !meetings.find((m) => m.id === selected.id)) {
      setSelected(null);
    }
  }, [selected, meetings, setSelected]);

  // 외부에서 scrollToId가 들어오면 해당 회의로 이동 및 상세 오픈
  useEffect(() => {
    if (scrollToId && itemRefs.current[scrollToId]) {
      setSelected(meetings.find((m) => m.id === scrollToId));
      setTimeout(() => {
        if (itemRefs.current[scrollToId]) {
          itemRefs.current[scrollToId].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [scrollToId, meetings, setSelected]);

  const handleTagClick = () => {
    if (setTab) {
      setTab("tag");
    }
  };

  const handleSaveTags = (meetingId, newTags) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === meetingId
          ? { ...m, tags: Array.from(new Set([...(m.tags || []), ...newTags])) }
          : m
      )
    );
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (meetingId, tag) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === meetingId
          ? { ...m, tags: (m.tags || []).filter((t) => t !== tag) }
          : m
      )
    );
  };

  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (meeting) => {
    setEditId(meeting.id);
    setEditContent(meeting.content);
  };

  const handleSaveEdit = async (id) => {
    const targetMeeting = meetings.find((m) => m.id === id);
    const updatedMeeting = {
      meetingNo: targetMeeting.id, // DB PK와 일치!
      meetTitle: targetMeeting.title, // 기존 제목
      meetContent: editContent, // 수정 내용만 변경
      meetDate: targetMeeting.date, // 기존 날짜
      gptSummary: targetMeeting.summary, // 기존 요약
      memberNo: targetMeeting.memberNo, // 기존 멤버 (null 가능)
    };

    try {
      const res = await fetch("/api/meetings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMeeting),
      });
      if (res.ok) {
        setMeetings((prev) =>
          prev.map((m) => (m.id === id ? { ...m, content: editContent } : m))
        );
        alert("수정 완료!");
      } else {
        alert("수정 실패(서버)");
      }
    } catch (e) {
      alert("수정 실패(네트워크)");
    }
    setEditId(null);
  };

  const myMemberNo = null; // TODO: 실제 로그인 사용자 번호로 대체

  // 내가 등록한 회의록만 필터링
  // const filtered = meetings.filter(m => m.memberNo === myMemberNo);
  const filtered = Array.isArray(meetings)
    ? meetings.filter((m) => m.memberNo === myMemberNo)
    : [];

  return (
    <div>
      <h3>회의록 목록</h3>
      <ul className="meeting-list">
        {filtered.map((m) => (
          <li
            key={m.id}
            ref={(el) => (itemRefs.current[m.id] = el)}
            className={`meeting-list-item${
              selected && selected.id === m.id ? " selected" : ""
            }`}
            onClick={() => setSelected(m)}
          >
            <b className="meeting-title">{m.title}</b>{" "}
            <span className="meeting-date">({m.date})</span>
            <br />
            <span>
              태그:{" "}
              {m.tags && m.tags.length > 0
                ? m.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span
                        className="meeting-tag"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagClick(tag);
                        }}
                      >
                        {tag}
                        {selected && selected.id === m.id && (
                          <button
                            className="meeting-tag-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(m.id, tag);
                            }}
                            title="태그 삭제"
                          >
                            ×
                          </button>
                        )}
                      </span>
                      {idx < m.tags.length - 1 && (
                        <span className="meeting-tag-comma">, </span>
                      )}
                    </React.Fragment>
                  ))
                : "없음"}
            </span>
            {selected && selected.id === m.id && (
              <div className="meeting-detail">
                <div className="meeting-detail-section">
                  <b>회의 내용:</b>
                  <div>
                    {editId === m.id ? (
                      <textarea
                        className="meeting-edit-textarea"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                      />
                    ) : (
                      selected.content
                    )}
                    <div className="meeting-detail-btns-bottom">
                      {editId === m.id ? (
                        <>
                          <button
                            className="meeting-detail-save-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveEdit(m.id);
                            }}
                          >
                            저장
                          </button>
                          <button
                            className="meeting-detail-cancel-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditId(null);
                            }}
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="meeting-detail-edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(m);
                            }}
                          >
                            수정
                          </button>
                          <button

                            className="meeting-detail-delete-btn meeting-detail-delete-btn-margin"
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (window.confirm("정말 삭제하시겠습니까?")) {
                                try {
                                  const res = await fetch(
                                    `/api/meetings/${m.id}`,
                                    { method: "DELETE" }
                                  );
                                  if (res.ok) {
                                    setMeetings((prev) =>
                                      prev.filter((mm) => mm.id !== m.id)
                                    );
                                    alert("Delete!!");
                                  } else {
                                    alert("삭제 실패(서버)");
                                  }
                                } catch (e) {
                                  alert("삭제 실패(네트워크)");
                                }
                              }
                            }}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="meeting-detail-section">
                  <SumAndMakeTag
                    initialContent={selected.content}
                    onSaveTags={(tags) => handleSaveTags(selected.id, tags)}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingList;
