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
  const [selectedDate, setSelectedDate] = useState('');
  const calendarRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const [selectedSubLocation, setSelectedSubLocation] = useState('전체');
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const locationRef = useRef(null);
  const [selectedCostOption, setSelectedCostOption] = useState('');
  const [minCost, setMinCost] = useState('');
  const [maxCost, setMaxCost] = useState('');
  const [costDropdownVisible, setCostDropdownVisible] = useState(false);
  const [selectedMemberOption, setSelectedMemberOption] = useState('');
  const [minMember, setMinMember] = useState('');
  const [maxMember, setMaxMember] = useState('');
  const [memberDropdownVisible, setMemberDropdownVisible] = useState(false);

  const formatingDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // 필터 파라미터 적용 함수
  const applyFilters = () => {
    const filterParams = {
      club_status: selectedSort ? selectedSort : '',
      club_place:
        selectedSubLocation !== '전체'
          ? selectedLocation + ' ' + selectedSubLocation
          : '',
      club_date: selectedTags.includes('날짜')
        ? formatingDate(selectedDate)
        : '',
      club_min_cost: minCost || '', // 필요시 상태 추가
      club_max_cost: maxCost || '', // 필요시 상태 추가
      total_min_count: minMember || '', // 필요시 상태 추가
      total_max_count: maxMember || '', // 필요시 상태 추가
      search_condition: selectedSearchOption,
      search_text: searchKeyword,
    };
    onFilterChange(filterParams);
  };

  // 검색어 입력 시 엔터 키 처리
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch({
        search_condition: selectedSearchOption,
        search_text: searchKeyword,
      });
      applyFilters();
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedSort]);
  useEffect(() => {
    applyFilters();
  }, [selectedTags]);

  useEffect(() => {
    if (!calendarVisible) {
      applyFilters();
    }
  }, [selectedDate, calendarVisible]);

  useEffect(() => {
    if (!locationDropdownVisible) {
      applyFilters();
    }
  }, [selectedSubLocation, locationDropdownVisible]);

  useEffect(() => {
    if (!costDropdownVisible) {
      applyFilters();
    }
  }, [minCost, maxCost, costDropdownVisible]);

  useEffect(() => {
    if (!memberDropdownVisible) {
      applyFilters();
    }
  }, [minMember, maxMember, memberDropdownVisible]);
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
  const handleTagClick = (tag) => {
    handleTagChange(tag);
    switch (tag) {
      case '날짜':
        setCalendarVisible(true);
        setLocationDropdownVisible(false);
        setCostDropdownVisible(false);
        setMemberDropdownVisible(false);
        break;
      case '장소':
        setLocationDropdownVisible(true);
        setCalendarVisible(false);
        setCostDropdownVisible(false);
        setMemberDropdownVisible(false);
        break;
      case '비용':
        setCostDropdownVisible(true);
        setCalendarVisible(false);
        setLocationDropdownVisible(false);
        setMemberDropdownVisible(false);
        break;
      case '모집인원':
        setMemberDropdownVisible(true);
        setCalendarVisible(false);
        setLocationDropdownVisible(false);
        setCostDropdownVisible(false);
        break;
      default:
        setCalendarVisible(false);
        setLocationDropdownVisible(false);
        setCostDropdownVisible(false);
        setMemberDropdownVisible(false);
    }
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // 태그가 제거될 때 관련 상태 초기화
        switch (tag) {
          case '날짜':
            setSelectedDate('');
            break;
          case '장소':
            setSelectedLocation('전체');
            setSelectedSubLocation('전체');
            break;
          case '비용':
            setMinCost('');
            setMaxCost('');
            setSelectedCostOption('');
            break;
          case '모집인원':
            setMinMember('');
            setMaxMember('');
            setSelectedMemberOption('');
            break;
          default:
            break;
        }
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
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
  useEffect(() => {}, [selectedTags]);
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
    서울: [
      '전체',
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
    부산: [
      '전체',
      '강서구',
      '금정구',
      '기장군',
      '남구',
      '동구',
      '동래구',
      '부산진구',
      '북구',
      '사상구',
      '사하구',
      '서구',
      '수영구',
      '연제구',
      '영도구',
      '중구',
      '해운대구',
    ],
    대구: [
      '전체',
      '남구',
      '달서구',
      '달성군',
      '동구',
      '북구',
      '서구',
      '수성구',
      '중구',
    ],
    인천: [
      '전체',
      '강화군',
      '계양구',
      '미추홀구',
      '남동구',
      '동구',
      '부평구',
      '서구',
      '연수구',
      '옹진군',
      '중구',
    ],
    광주: ['전체', '광산구', '남구', '동구', '북구', '서구'],
    대전: ['전체', '대덕구', '동구', '서구', '유성구', '중구'],
    울산: ['전체', '남구', '동구', '북구', '울주군', '중구'],
    세종: ['전체', '세종시'],
    경기도: [
      '전체',
      '가평군',
      '고양시',
      '과천시',
      '광명시',
      '광주시',
      '구리시',
      '군포시',
      '김포시',
      '남양주시',
      '동두천시',
      '부천시',
      '성남시',
      '수원시',
      '시흥시',
      '안산시',
      '안성시',
      '안양시',
      '양주시',
      '양평군',
      '여주시',
      '연천군',
      '오산시',
      '용인시',
      '의왕시',
      '의정부시',
      '이천시',
      '파주시',
      '평택시',
      '포천시',
      '하남시',
      '화성시',
    ],
    강원도: [
      '전체',
      '강릉시',
      '고성군',
      '동해시',
      '삼척시',
      '속초시',
      '양구군',
      '양양군',
      '영월군',
      '원주시',
      '인제군',
      '정선군',
      '철원군',
      '춘천시',
      '태백시',
      '평창군',
      '홍천군',
      '화천군',
      '횡성군',
    ],
    충청북도: [
      '전체',
      '괴산군',
      '단양군',
      '보은군',
      '영동군',
      '옥천군',
      '음성군',
      '제천시',
      '증평군',
      '진천군',
      '청주시',
      '충주시',
    ],
    충청남도: [
      '전체',
      '계룡시',
      '공주시',
      '금산군',
      '논산시',
      '당진시',
      '보령시',
      '부여군',
      '서산시',
      '서천군',
      '아산시',
      '예산군',
      '천안시',
      '청양군',
      '태안군',
      '홍성군',
    ],
    전라북도: [
      '전체',
      '고창군',
      '군산시',
      '김제시',
      '남원시',
      '무주군',
      '부안군',
      '순창군',
      '완주군',
      '익산시',
      '임실군',
      '장수군',
      '전주시',
      '정읍시',
      '진안군',
    ],
    전라남도: [
      '전체',
      '강진군',
      '고흥군',
      '곡성군',
      '광양시',
      '구례군',
      '나주시',
      '담양군',
      '목포시',
      '무안군',
      '보성군',
      '순천시',
      '신안군',
      '여수시',
      '영광군',
      '영암군',
      '완도군',
      '장성군',
      '장흥군',
      '진도군',
      '함평군',
      '해남군',
      '화순군',
    ],
    경상북도: [
      '전체',
      '경산시',
      '경주시',
      '고령군',
      '구미시',
      '군위군',
      '김천시',
      '문경시',
      '봉화군',
      '상주시',
      '성주군',
      '안동시',
      '영덕군',
      '영양군',
      '영주시',
      '영천시',
      '예천군',
      '울릉군',
      '울진군',
      '의성군',
      '청도군',
      '청송군',
      '칠곡군',
      '포항시',
    ],
    경상남도: [
      '전체',
      '거제시',
      '거창군',
      '고성군',
      '김해시',
      '남해군',
      '밀양시',
      '사천시',
      '산청군',
      '양산시',
      '의령군',
      '진주시',
      '창녕군',
      '창원시',
      '통영시',
      '하동군',
      '함안군',
      '함양군',
      '합천군',
    ],
    제주도: ['전체', '서귀포시', '제주시'],
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
  // 필터 - 비용

  const handleCostOptionChange = (option) => {
    setSelectedCostOption(option);
    switch (option) {
      case '10,000원 이하':
        setMinCost('0');
        setMaxCost('10000');
        break;
      case '10,000원 ~ 30,000원':
        setMinCost('10000');
        setMaxCost('30000');
        break;
      case '30,000원 ~ 50,000원':
        setMinCost('30000');
        setMaxCost('50000');
        break;
      case '직접 입력':
        setMinCost('');
        setMaxCost('');
        break;
      default:
        setMinCost('');
        setMaxCost('');
    }
  };
  const formatNumberWithCommas = (number) => {
    return parseInt(number, 10).toLocaleString();
  };

  const handleApplyCostFilter = () => {
    if (selectedCostOption === '직접 입력') {
      setSelectedCostOption(
        `${formatNumberWithCommas(minCost)}원 ~ ${formatNumberWithCommas(
          maxCost
        )}원`
      );
    }
    setCostDropdownVisible(false);
  };
  const handleMinCostChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setMinCost(value);
    }
  };

  const handleMaxCostChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setMaxCost(value);
    }
  };
  // 필터 - 모집인원

  const handleMemberOptionChange = (option) => {
    setSelectedMemberOption(option);
    switch (option) {
      case '5명 이하':
        setMinMember('0');
        setMaxMember('5');
        break;
      case '6명 ~ 15명':
        setMinMember('6');
        setMaxMember('15');
        break;
      case '16명 ~ 30명':
        setMinMember('16');
        setMaxMember('30');
        break;
      case '직접 입력':
        setMinMember('');
        setMaxMember('');
        break;
      default:
        setMinMember('');
        setMaxMember('');
    }
  };

  const handleApplyMemberFilter = () => {
    if (selectedMemberOption === '직접 입력') {
      setSelectedMemberOption(`${minMember}명 ~ ${maxMember}명`);
    }
    setMemberDropdownVisible(false);
  };
  const handleMinMemberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setMinMember(value);
    }
  };

  const handleMaxMemberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setMaxMember(value);
    }
  };
  return (
    <div className="club-filter-container">
      <div className="club-filter-left-container">
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
                  handleTagClick('날짜');
                  setCalendarVisible(true);
                }}
              >
                {selectedDate &&
                selectedTags.includes('날짜') &&
                !calendarVisible
                  ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`
                  : '날짜'}
              </div>
              {calendarVisible && selectedTags.includes('날짜') && (
                <div
                  ref={calendarRef}
                  className="club-filter-calendar-container"
                >
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
                handleTagClick('장소');
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
              className={
                selectedTags.includes('비용')
                  ? 'club-filter-tag-list-selected'
                  : 'club-filter-tag-list'
              }
              onClick={() => {
                handleTagClick('비용');
                setCostDropdownVisible(true);
                setSelectedCostOption('');
                setMinCost('');
                setMaxCost('');
              }}
            >
              {selectedCostOption &&
              selectedTags.includes('비용') &&
              !costDropdownVisible
                ? selectedCostOption
                : '비용'}
            </li>
            {costDropdownVisible && selectedTags.includes('비용') && (
              <div className="club-filter-cost-dropdown-container">
                <ul className="club-filter-cost-option-container">
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="cost"
                      value="10,000원 이하"
                      checked={selectedCostOption === '10,000원 이하'}
                      onChange={() => handleCostOptionChange('10,000원 이하')}
                    />
                    <span>10,000원 이하</span>
                  </label>
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="cost"
                      value="10,000원 ~ 30,000원"
                      checked={selectedCostOption === '10,000원 ~ 30,000원'}
                      onChange={() =>
                        handleCostOptionChange('10,000원 ~ 30,000원')
                      }
                    />
                    <span>10,000원 ~ 30,000원</span>
                  </label>
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="cost"
                      value="30,000원 ~ 50,000원"
                      checked={selectedCostOption === '30,000원 ~ 50,000원'}
                      onChange={() =>
                        handleCostOptionChange('30,000원 ~ 50,000원')
                      }
                    />
                    <span>30,000원 ~ 50,000원</span>
                  </label>
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="cost"
                      value="직접 입력"
                      checked={selectedCostOption === '직접 입력'}
                      onChange={() => handleCostOptionChange('직접 입력')}
                    />
                    <span>직접 입력</span>
                  </label>
                  <div className="club-filter-cost-custom-input">
                    <input
                      type="number"
                      placeholder="최저"
                      value={minCost}
                      onChange={handleMinCostChange}
                      className="custom-input"
                    />
                    <span className="cost-separator">~</span>
                    <input
                      type="number"
                      placeholder="최고"
                      value={maxCost}
                      onChange={handleMaxCostChange}
                      className="custom-input"
                    />
                    <span className="cost-unit">원</span>
                  </div>
                  <button
                    className="club-filter-cost-apply-button"
                    onClick={handleApplyCostFilter}
                  >
                    검색
                  </button>
                </ul>
              </div>
            )}
            <li
              className={
                selectedTags.includes('모집인원')
                  ? 'club-filter-tag-list-selected'
                  : 'club-filter-tag-list'
              }
              onClick={() => {
                handleTagClick('모집인원');
                setMemberDropdownVisible(true);
                setSelectedMemberOption('');
                setMinMember('');
                setMaxMember('');
              }}
            >
              {selectedMemberOption &&
              selectedTags.includes('모집인원') &&
              !memberDropdownVisible
                ? selectedMemberOption
                : '모집인원'}
            </li>
            {memberDropdownVisible && selectedTags.includes('모집인원') && (
              <div className="club-filter-member-dropdown-container">
                <div className="club-filter-cost-option-container">
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="member"
                      value="5명 이하"
                      checked={selectedMemberOption === '5명 이하'}
                      onChange={() => handleMemberOptionChange('5명 이하')}
                    />
                    <span>5명 이하</span>
                  </label>
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="member"
                      value="6명 ~ 15명"
                      checked={selectedMemberOption === '6명 ~ 15명'}
                      onChange={() => handleMemberOptionChange('6명 ~ 15명')}
                    />
                    <span>6명 ~ 15명</span>
                  </label>
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="member"
                      value="15명 ~ 30명"
                      checked={selectedMemberOption === '16명 ~ 30명'}
                      onChange={() => handleMemberOptionChange('16명 ~ 30명')}
                    />
                    <span>16명 ~ 30명</span>
                  </label>
                  <label className="club-filter-cost-option">
                    <input
                      type="radio"
                      name="member"
                      value="직접 입력"
                      checked={selectedMemberOption === '직접 입력'}
                      onChange={() => handleMemberOptionChange('직접 입력')}
                    />
                    <span>직접 입력</span>
                  </label>
                  <div className="club-filter-cost-custom-input">
                    <input
                      type="number"
                      placeholder="최저"
                      value={minMember}
                      onChange={handleMinMemberChange}
                      className="custom-input"
                    />
                    <span className="cost-separator">~</span>
                    <input
                      type="number"
                      placeholder="최고"
                      value={maxMember}
                      onChange={handleMaxMemberChange}
                      className="custom-input"
                    />
                    <span className="cost-unit">명</span>
                  </div>
                  <button
                    className="club-filter-cost-apply-button"
                    onClick={handleApplyMemberFilter}
                  >
                    검색
                  </button>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="club-filter-right-container">
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
              onKeyDown={handleSearchKeyPress}
              placeholder="검색어를 입력해 주세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
