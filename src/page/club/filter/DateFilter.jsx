import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ selectedTags, onTagChange, onDateChange }) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    };

    if (calendarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarVisible]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
    onDateChange(date); // 날짜 변경 시 상위 컴포넌트로 전달
  };

  const handleClick = () => {
    onTagChange('날짜');
    setCalendarVisible(true);
  };

  return (
    <li
      onClick={handleClick}
      className={
        selectedTags.includes('날짜')
          ? 'club-filter-tag-list-selected'
          : 'club-filter-tag-list'
      }
    >
      <div>
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
            inline
            disabledKeyboardNavigation
          />
        </div>
      )}
    </li>
  );
};

export default DateFilter;
