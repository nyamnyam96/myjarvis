import React, { useState } from 'react';

/**
 * MeetingInsert - 회의록 등록 폼 (MyJarvis 스타일 + 다크모드 강화)
 */
function MeetingInsert({ setTab }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [participants, setParticipants] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('회의록이 등록되었습니다!');
    setTitle('');
    setDate('');
    setContent('');
    setParticipants('');
    setFile(null);
    if (setTab) setTab('list');
  };

  return (
    <section className="w-full max-w-[640px] mx-auto mt-10 px-4">
      <div className="card p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 dark:bg-[#282b3d]">
        <h2 className="section-title mb-6 text-gray-800 dark:text-white">회의록 등록</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 제목 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">회의 제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input dark:bg-[#2b2e44] dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* 날짜 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">회의 일시</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input dark:bg-[#2b2e44] dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">회의 내용</label>
            <textarea
              placeholder="회의에서 논의된 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="input dark:bg-[#2b2e44] dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* 참여자 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">참여자 이메일 (쉼표로 구분)</label>
            <input
              type="text"
              placeholder="example@email.com, example2@email.com"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="input dark:bg-[#2b2e44] dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* 파일 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">첨부 파일</label>
            <div className="flex items-center gap-3">
              <input type="file" onChange={handleFileChange} className="text-sm dark:text-gray-300" />
              {file ? (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={handleFileRemove}
                    className="text-red-500 hover:underline"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500">선택된 파일 없음</span>
              )}
            </div>
          </div>

          {/* 버튼 */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold rounded-lg 
                         bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] shadow-md 
                         hover:brightness-110 transition-all duration-200"
            >
              회의록 등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MeetingInsert;
