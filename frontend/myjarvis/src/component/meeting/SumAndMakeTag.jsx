import React, { useState, useEffect } from 'react';
import './SumAndMakeTag.css';

/*
  AI 요약 실행, 자동 태그 추출

  - 회의 내용 요약 실행 버튼
  - 요약 결과 텍스트 표시
  - 요약문 직접 수정 가능
  - GPT기반 태그 추출 버튼
  - 추출된 태그 리스트 선택 적용
  - 불필요한 태그 삭제 기능
*/

// AI 요약 실행, GPT 태그 추출 샘플 (회의 내용 입력 → 요약/태그)
function SumAndMakeTag({ initialContent = '', onSaveTags }) {
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState([]);
  const [editSummary, setEditSummary] = useState(false);

  useEffect(() => {
    setContent(initialContent);
    setSummary('');
    setTags([]);
    setEditSummary(false);
  }, [initialContent]);

  const handleSummarize = () => {
    setSummary(content ? `${content.slice(0, 20)}... (AI 요약 예시)` : '회의 내용을 입력하세요.');
    setEditSummary(false);
  };
  const handleTag = () => {
    setTags(content ? ['업무', '회의', 'AI'] : []);
  };
  const handleTagRemove = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };
  // 태그 클릭 시 해당 태그만 저장
  const handleTagClick = (tag) => {
    if (onSaveTags) {
      onSaveTags([tag]);
    }
  };

  return (
    <div className="gpt-summary-tag">
      <div className="gpt-summary-section">
        <h3>회의 내용 GPT 요약 및 태그</h3>
        <textarea
          placeholder="회의 내용을 입력하세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
          className="gpt-content-input"
        />
        <div className="gpt-btns">
          <button onClick={handleSummarize}>요약 실행</button>
          <button onClick={handleTag}>GPT 태그 추출</button>
        </div>
      </div>
      <div className="gpt-summary-area">
        <strong>요약:</strong>
        <span className="gpt-summary-text">{summary}</span>
      </div>
      <div className="gpt-tag-area">
        <strong>태그:</strong>
        <div className="gpt-tag-list">
          {tags.map(tag => (
            <span key={tag} className="gpt-tag-item">
              <span onClick={() => handleTagClick(tag)} style={{ cursor: onSaveTags ? 'pointer' : 'default', marginRight: 4 }}>{tag}</span>
              <button onClick={() => handleTagRemove(tag)} className="gpt-tag-remove">×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SumAndMakeTag;