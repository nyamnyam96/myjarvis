import React, { useState, useEffect } from 'react';
import './SumAndMakeTag.css';

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

  const handleTagClick = (tag) => {
    if (onSaveTags) {
      onSaveTags([tag]);
    }
  };

  return (
    <div className="gpt-summary-tag flex gap-6">
  {/* 회의 내용 입력 + 버튼 */}
  <div className="flex flex-col flex-1">
    <label className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">
      회의 내용 입력
    </label>
    <div className="flex gap-4">
      <textarea
        placeholder="회의 내용을 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={5}
        className="gpt-content-input flex-1"
      />
      <div className="flex flex-col gap-2">
        <button className="btn-gpt" onClick={handleSummarize}>요약 실행</button>
        <button className="btn-gpt" onClick={handleTag}>GPT 태그 추출</button>
      </div>
    </div>
  </div>

  {/* 요약 */}
  <div className="flex flex-col flex-1">
    <label className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">
      요약
    </label>
    <textarea
      value={summary}
      readOnly
      className="gpt-summary-textarea h-full"
      rows={5}
    />
  </div>

  {/* 태그 */}
  <div className="flex flex-col flex-1">
    <label className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">
      태그
    </label>
    <div className="gpt-tag-list">
      {tags.map(tag => (
        <span key={tag} className="gpt-tag-item">
          <span
            onClick={() => handleTagClick(tag)}
            style={{ cursor: onSaveTags ? 'pointer' : 'default', marginRight: 4 }}
          >
            {tag}
          </span>
          <button onClick={() => handleTagRemove(tag)} className="gpt-tag-remove">×</button>
        </span>
      ))}
    </div>
  </div>
</div>

  );
}

export default SumAndMakeTag;
