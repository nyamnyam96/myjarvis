// components/layout/Modal.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 모달 컴포넌트
 * @param {boolean} open - 모달 표시 여부
 * @param {function} onClose - 닫기 이벤트 핸들러
 * @param {ReactNode} children - 모달 내부 콘텐츠
 */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="modal-bg" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {children}
        <div className="mt-4 text-right">
          <button className="btn btn-outline" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
