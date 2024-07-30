import React from 'react';

const ParticipantsFilter = ({ selectedTags, onTagChange }) => {
  const handleClick = () => {
    onTagChange('모집인원');
  };

  return (
    <li
      onClick={handleClick}
      className={
        selectedTags.includes('모집인원')
          ? 'club-filter-tag-list-selected'
          : 'club-filter-tag-list'
      }
    >
      모집인원
    </li>
  );
};

export default ParticipantsFilter;
