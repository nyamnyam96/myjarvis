import React from "react";

const BgInsert = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-[#21243a] rounded-xl w-[90%] max-w-xl p-6 shadow-xl transition-all duration-300">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">배경 이미지 등록</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 설명 */}
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          나만의 배경 이미지를 등록해보세요. 등록한 이미지는 대시보드 배경으로 사용됩니다.
        </p>

        {/* 파일 업로드 */}
        <div className="flex flex-col items-start gap-3">
          <label htmlFor="bg-upload" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            배경 이미지 선택
          </label>
          <input
            type="file"
            id="bg-upload"
            accept="image/*"
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4f46e5] file:text-white hover:file:brightness-110 dark:file:bg-[#6366f1]"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-[#2c2f45]"
          >
            취소
          </button>
          <button
            onClick={() => alert("등록 기능은 추후 구현됩니다.")}
            className="btn px-5 py-2 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] hover:brightness-110"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BgInsert;
