// 📌 FilterChip.jsx
// - 리스트 필터링이나 통계 필터 등에 사용하는 칩 UI입니다.
// - 선택되면 .active 스타일이 적용됩니다.

import React from 'react';
import classNames from 'classnames';

const FilterChip = ({ label, active, onClick }) => {
  return (
    <span
      className={classNames('filter-chip', { active })}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default FilterChip;
