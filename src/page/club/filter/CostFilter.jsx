import React from 'react';

const CostFilter = ({ selectedTags, onTagChange }) => {
  const handleClick = () => {
    onTagChange('비용');
  };

  return (
    <li
      onClick={handleClick}
      className={
        selectedTags.includes('비용')
          ? 'club-filter-tag-list-selected'
          : 'club-filter-tag-list'
      }
    >
      비용
    </li>
  );
};

export default CostFilter;
