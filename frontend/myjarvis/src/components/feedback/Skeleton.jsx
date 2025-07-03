// components/feedback/Skeleton.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Skeleton 컴포넌트
 * 로딩 중 UI를 나타내는 데 사용합니다.
 * Tailwind 클래스 조합으로 크기 조절 가능
 * 
 * @param {string} className - 추가 스타일 클래스
 */
const Skeleton = ({ className = '' }) => {
  return <div className={classNames('skeleton', className)} />;
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;
