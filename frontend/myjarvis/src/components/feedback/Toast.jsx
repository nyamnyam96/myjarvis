// components/Toast.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 간단한 사용자 알림 컴포넌트
 * @param {string} message - 표시할 메시지
 * @param {boolean} visible - 표시 여부 (조건부 렌더링용)
 * @param {function} onClose - 닫기 동작 (선택)
 */
const Toast = ({ message, visible = true, onClose }) => {
  if (!visible) return null;

  return (
    <div className="toast">
      {message}
      {onClose && (
        <button
          className="ml-2 text-sm underline"
          onClick={onClose}
        >
          닫기
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Toast;