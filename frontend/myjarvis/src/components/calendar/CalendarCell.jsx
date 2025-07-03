// 📌 CalendarCell.jsx
// - 달력 내 셀을 구성하는 단위 컴포넌트입니다.
// - today, selected 상태에 따라 배경색/글자색이 변경됩니다.

import React from 'react';
import classNames from 'classnames';

const CalendarCell = ({ day, isToday, isSelected }) => {
  return (
    <div
      className={classNames('calendar-cell', {
        today: isToday,
        selected: isSelected,
      })}
    >
      {day}
    </div>
  );
};

export default CalendarCell;
