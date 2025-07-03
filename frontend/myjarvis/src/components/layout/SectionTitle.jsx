// components/layout/SectionTitle.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 페이지 섹션 제목 컴포넌트
 * @param {string} children - 제목 텍스트
 * @param {string} className - 추가 클래스 (선택)
 */
const SectionTitle = ({ children, className = '' }) => {
  return (
    <h2 className={classNames('section-title', className)}>
      {children}
    </h2>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
