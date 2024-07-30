import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ReactComponent as Select } from '../../assets/images/FilterSelect.svg';
import { ReactComponent as Search } from '../../assets/images/FilterSearch.svg';
import { ReactComponent as ViewsIcon } from '../../assets/images/ViewsIcon.svg';
import { ReactComponent as LikesIcon } from '../../assets/images/LikesIcon.svg';
import { ReactComponent as NextIcon } from '../../assets/images/Next.svg';
import { ReactComponent as CalendarPrev } from '../../assets/images/CalendarPrev.svg';
import { ReactComponent as CalendarNext } from '../../assets/images/CalendarNext.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 소모임 생성 버튼 컴포넌트
const WriteButton = ({ onWrite }) => {
  return (
    <button className="club-header-writebutton" onClick={onWrite}>
      소모임 만들기
    </button>
  );
};
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
// 소모임 목록 컴포넌트
const timeForm = (date) => {
  const now = new Date();
  const diff = now - new Date(date);

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);
  const months = Math.floor(diff / 2592000000);

  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  if (weeks < 4) return `${weeks}주 전`;
  if (months < 12) return `${months}달 전`;
  return new Date(date).toLocaleDateString();
};
const handleAdClick = (link) => {
  window.open(link, '_blank');
};
const Postlist = ({ posts }) => {
  return (
    <div className="club-postlist-container">
      <ul className="club-postist">
        {posts.map((post, index) => (
          <li key={post.id} className="club-postlist-postitem-container">
            {post.isAd ? (
              <div className="club-postlist-postitem-ad">
                <img
                  src={post.imageUrl || DefaultPostImg}
                  alt="adimg"
                  className="club-postlist-postitem-adimage"
                />

                <div className="club-postlist-ad-adbox">
                  <div className="club-postlist-ad-adbox-titlebox">
                    <div className="club-postlist-ad-adbox-titlebox-tag">
                      {post.tag}
                    </div>
                    <div className="club-postlist-ad-adbox-titlebox-title">
                      {post.title}
                    </div>
                  </div>
                  <div className="club-postlist-ad-adbox-infobox">
                    <div className="club-postlist-ad-adbox-infobox-nickname">
                      {post.nickname}
                    </div>
                    <div
                      className="club-postlist-ad-adbox-infobox-link"
                      onClick={() => handleAdClick(post.link)}
                    >
                      {post.link}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="club-postlist-postitem-post">
                <img
                  src={post.imageUrl || DefaultPostImg}
                  alt={post.title}
                  className="club-postlist-postitem-postimage"
                />
                <div className="club-postlist-postitem-postbox">
                  <div className="club-postlist-postitem-postbox-titlebox">
                    <div className="club-postlist-postitem-postbox-titlebox-tag">
                      {post.tag}
                    </div>
                    <div className="club-postlist-postitem-postbox-titlebox-title">
                      {post.title}
                    </div>
                    {post.comments > 0 && (
                      <div className="club-postlist-postitem-postbox-titlebox-comments">
                        {post.comments}
                      </div>
                    )}
                  </div>
                  <div className="club-postlist-postitem-infobox">
                    <div className="club-postlist-postitem-infobox-nickname">
                      {post.nickname}
                    </div>
                    <div className="club-postlist-postitem-infobxo-dot">·</div>
                    <div className="club-postlist-postitem-infobox-time">
                      {timeForm(post.createdAt)}
                    </div>
                    <div className="club-postlist-postitem-infobxo-dot">·</div>
                    <ViewsIcon className="club-postlist-postitem-infobox-view-icon" />
                    <div className="postViclub-postlist-postitem-infobox-view">
                      {post.views}{' '}
                    </div>
                    <div className="club-postlist-postitem-infobxo-dot">·</div>
                    <LikesIcon className="club-postlist-postitem-infobox-like-icon" />
                    {post.likes > 0 && (
                      <div className="club-postlist-postitem-infobox-like">
                        {post.likes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {index < posts.length - 1 && (
              <hr className="club-postlist-divider" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 페이지네이션 컴포넌트
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const currentGroup = Math.floor((currentPage - 1) / maxPagesToShow);
  const startPage = currentGroup * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleNextGroup = () => {
    const nextGroupFirstPage = startPage + maxPagesToShow;
    if (nextGroupFirstPage <= totalPages) {
      onPageChange(nextGroupFirstPage);
    }
  };

  const handlePrevGroup = () => {
    const prevGroupFirstPage = startPage - maxPagesToShow;
    if (prevGroupFirstPage > 0) {
      onPageChange(prevGroupFirstPage);
    }
  };

  return (
    <div className="club-pagination-container">
      <div className="club-pagination-box">
        {startPage > 1 && (
          <div
            className="club-pagination-previcon-box"
            onClick={handlePrevGroup}
          >
            <NextIcon className="club-pagination-previcon" />
          </div>
        )}
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? 'club-pagination-selectedpage'
                : 'club-pagination-page'
            }
          >
            {page}
          </div>
        ))}
        {endPage < totalPages && (
          <div
            className="club-pagination-nexticon-box"
            onClick={handleNextGroup}
          >
            <NextIcon className="club-pagination-nexticon" />
          </div>
        )}
      </div>
    </div>
  );
};

// 메인 게시판 컴포넌트
const Club = () => {
  const { club } = useParams();
  const { sport } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  // 게시판별 태그 배열 정의
  const tags = {
    free: ['전체', '소모임', '용품', '운동', '시설'],
    review: ['전체', '리뷰', '추천', '경험담'],
    info: ['전체', '공지', '이벤트', '문의'],
  };

  // 현재 게시판에 맞는 태그 배열 선택
  const currentTags = tags[club] || [];
  // 총 페이지 수를 게시물 수로 계산
  const totalPages = Math.ceil(100 / 14); // 총 30개의 목업 데이터와 한 페이지에 14개씩

  // 목업 데이터
  const mockPosts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    imageUrl: '',
    title: `게시글 제목 ${i + 1}`,
    tag: '태그',
    nickname: `작성자 ${i + 1}`,
    createdAt: new Date().toISOString(),
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
  }));

  // 광고 목업 데이터
  const adData = {
    id: 'ad1',
    isAd: true,
    tag: '광고',
    title: '나랑 스껄할래?',
    nickname: '스컬스컬',
    link: 'https://s-cul.com',
  };

  useEffect(() => {
    // 페이지에 맞는 게시물 목록을 필터링 및 광고 삽입
    const startIdx = (currentPage - 1) * 14;
    const endIdx = startIdx + 14;
    const postsWithAd = [
      ...mockPosts.slice(startIdx, startIdx + 4),
      adData,
      ...mockPosts.slice(startIdx + 4, endIdx),
    ];
    setPosts(postsWithAd);
    //fetchPosts();
  }, [currentPage]);

  const fetchPosts = async (filterParams) => {
    // API 호출 로직 추가
    // const response = await fetch('/api/posts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ page: currentPage, ...filterParams }),
    // });
    // const data = await response.json();
    // setPosts(data.posts);
  };

  const handleWriteClick = () => {
    alert('글 작성 버튼 클릭됨');
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (filterParams) => {
    fetchPosts(filterParams);
  };

  const handleTagChange = (filterParams) => {
    fetchPosts(filterParams);
  };

  const handleSearch = (searchParams) => {
    fetchPosts(searchParams);
  };

  return (
    <div className="club-container">
      <div className="club-header">
        <div className="club-header-name">소모임</div>
        <WriteButton onWrite={handleWriteClick} />
      </div>
      <Filter
        tags={currentTags} // 현재 게시판에 맞는 태그 배열 전달
        onFilterChange={handleFilterChange}
        onTagChange={handleTagChange}
        onSearch={handleSearch}
      />
      <Postlist posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default Club;
