// 📂 Dropzone.jsx
// - 사용자가 파일을 업로드할 수 있는 드래그 앤 드롭 박스
// - 클릭 또는 드래그로 파일을 선택 가능
// - 외부에서 onDrop 콜백을 전달받아 업로드 동작을 처리
// - 사용 예시:
//   <Dropzone onDrop={(files) => console.log(files)} />

import React from 'react';

const Dropzone = ({ onDrop }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (onDrop) {
      onDrop(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && onDrop) {
      onDrop(e.dataTransfer.files);
    }
  };

  return (
    <div
      className="dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <p className="dropzone-text">여기로 파일을 드래그하거나 클릭해서 업로드하세요</p>
      <input
        id="fileInput"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Dropzone;
