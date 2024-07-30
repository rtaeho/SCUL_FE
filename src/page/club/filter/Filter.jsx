import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Select } from '../../../assets/images/FilterSelect.svg';
import { ReactComponent as Search } from '../../../assets/images/FilterSearch.svg';
import { ReactComponent as CalendarPrev } from '../../../assets/images/CalendarPrev.svg';
import { ReactComponent as CalendarNext } from '../../../assets/images/CalendarNext.svg';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const Filter = ({ tags, onFilterChange, onTagChange, onSearch }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSort, setSelectedSort] = useState('마감 포함');
  const [selectedSearchOption, setSelectedSearchOption] = useState('제목');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const [selectedSubLocation, setSelectedSubLocation] = useState('전체');
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdownVisible(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    };

    if (locationDropdownVisible || calendarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationDropdownVisible, calendarVisible]);

  const handleDateChange = (event) => {
    setSelectedDate(event);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setSortDropdownVisible(false);
    onFilterChange({
      sort,
      tags: selectedTags,
      searchOption: selectedSearchOption,
      keyword: searchKeyword,
    });
  };

  const handleSearchOptionChange = (searchOption) => {
    setSelectedSearchOption(searchOption);
    setSearchDropdownVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      onSearch({
        sort: selectedSort,
        tags: selectedTags,
        searchOption: selectedSearchOption,
        keyword: searchKeyword,
      });
    }
  };
  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
    <div className="custom-header">
      <button onClick={decreaseMonth} className="custom-nav-button-prev">
        <CalendarPrev />
      </button>
      <span className="react-datepicker__current-month">
        {format(date, 'yyyy년 M월', { locale: ko })}
      </span>
      <button onClick={increaseMonth} className="custom-nav-button-next">
        <CalendarNext />
      </button>
    </div>
  );
  const locations = {
    전체: ['전체'],
  };
  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    setSelectedSubLocation('전체');
  };

  const handleSubLocationChange = (event) => {
    const subLocation = event.target.value;
    setSelectedSubLocation(subLocation);
  };

  return (
    <div className="club-filter-container">
      <div className="club-filter-select-container">
        <div className="club-filter-selected">{selectedSort}</div>
        <Select
          className="club-filter-select-button"
          onClick={() => setSortDropdownVisible(!sortDropdownVisible)}
        />
        {sortDropdownVisible && (
          <ul className="club-filter-select-dropdown-container">
            <li
              key="마감 포함"
              className="club-filter-select-dropdown-list"
              onClick={() => handleSortChange('마감 포함')}
            >
              마감 포함
            </li>
            <hr className="club-filter-select-dropdown-list-hr" />
            <li
              key="마감 미포함"
              className="club-filter-select-dropdown-list"
              onClick={() => handleSortChange('마감 미포함')}
            >
              마감 미포함
            </li>
          </ul>
        )}
      </div>
      <div className="club-filter-tag-container">
        <ul className="club-filter-tag-list-container">
          <li
            className={
              selectedTags.includes('날짜')
                ? 'club-filter-tag-list-selected'
                : 'club-filter-tag-list'
            }
          >
            <div
              onClick={() => {
                handleTagChange('날짜');
                setCalendarVisible(true);
              }}
            >
              {selectedDate && selectedTags.includes('날짜') && !calendarVisible
                ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`
                : '날짜'}
            </div>
            {calendarVisible && selectedTags.includes('날짜') && (
              <div ref={calendarRef} className="club-filter-calendar-container">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  locale={ko}
                  renderCustomHeader={renderCustomHeader}
                  inline
                  disabledKeyboardNavigation
                />
              </div>
            )}
          </li>
          <li
            onClick={() => {
              handleTagChange('장소');
              setLocationDropdownVisible(true);
            }}
            className={
              selectedTags.includes('장소')
                ? 'club-filter-tag-list-selected'
                : 'club-filter-tag-list'
            }
          >
            {selectedSubLocation &&
            selectedTags.some((tag) => tag.includes('장소')) &&
            !locationDropdownVisible
              ? selectedSubLocation
              : '장소'}
          </li>
          {selectedTags.includes('장소') && locationDropdownVisible && (
            <div
              ref={locationRef}
              className="club-filter-location-dropdown-container"
            >
              <div className="club-filter-location-left-container">
                <div className="club-filter-location-header">시/도</div>
                <div className="club-filter-location-list">
                  {Object.keys(locations).map((location, index) => (
                    <div
                      key={index}
                      className={
                        selectedLocation === location
                          ? 'club-filter-location-item-selected'
                          : 'club-filter-location-item'
                      }
                      onClick={() =>
                        handleLocationChange({ target: { value: location } })
                      }
                    >
                      {location}
                    </div>
                  ))}
                </div>
              </div>
              <div className="club-filter-location-right-container">
                <div className="club-filter-location-header">시/군/구</div>
                <div className="club-filter-location-list">
                  {locations[selectedLocation].map((subLocation, index) => (
                    <div
                      key={index}
                      className={
                        selectedSubLocation === subLocation
                          ? 'club-filter-location-item-selected'
                          : 'club-filter-location-item'
                      }
                      onClick={() =>
                        handleSubLocationChange({
                          target: { value: subLocation },
                        })
                      }
                    >
                      {subLocation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <li
            onClick={() => handleTagChange('비용')}
            className={
              selectedTags.includes('비용')
                ? 'club-filter-tag-list-selected'
                : 'club-filter-tag-list'
            }
          >
            비용
          </li>

          <li
            onClick={() => handleTagChange('모집인원')}
            className={
              selectedTags.includes('모집인원')
                ? 'club-filter-tag-list-selected'
                : 'club-filter-tag-list'
            }
          >
            모집인원
          </li>
        </ul>
      </div>
      <div className="club-filter-search-container">
        <div className="club-filter-search-select-container">
          <div
            className="club-filter-search-select-selected"
            onClick={() => setSearchDropdownVisible(!searchDropdownVisible)}
          >
            {selectedSearchOption}
            {searchDropdownVisible && (
              <ul className="club-filter-search-select-dropdown-container">
                <li
                  className="club-filter-search-select-dropdown-list"
                  onClick={() => handleSearchOptionChange('제목')}
                >
                  제목
                </li>
                <hr className="club-filter-search-select-dropdown-list-hr" />
                <li
                  className="club-filter-search-select-dropdown-list"
                  onClick={() => handleSearchOptionChange('작성자')}
                >
                  작성자
                </li>
                <hr className="club-filter-search-select-dropdown-list-hr" />
                <li
                  className="club-filter-search-select-dropdown-list"
                  onClick={() => handleSearchOptionChange('내용')}
                >
                  내용
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="club-filter-search-input-container">
          <Search className="club-filter-search-input-icon" />
          <input
            className="club-filter-search-input"
            type="text"
            value={searchKeyword}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            placeholder="검색어를 입력해 주세요"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
