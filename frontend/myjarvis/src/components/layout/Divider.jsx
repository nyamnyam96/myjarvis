// components/layout/Divider.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 시각적 구분선 Divider 컴포넌트
 * @param {string} className - 추가 클래스 (선택)
 */
const Divider = ({ className = '' }) => {
  return <div className={classNames('divider', className)} />;
};

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
