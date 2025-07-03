// ⬇️ DropdownMenu.jsx
// - 필터/옵션/계정설정 드롭다운용 메뉴

import React from 'react';

const DropdownMenu = ({ items = [], onSelect }) => {
  return (
    <div className="dropdown-menu">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`dropdown-item ${item.danger ? 'dropdown-item-danger' : ''}`}
          onClick={() => onSelect(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
