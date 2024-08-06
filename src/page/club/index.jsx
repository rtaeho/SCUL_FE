import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as NextIcon } from '../../assets/images/Next.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';
import Filter from './filter/index.jsx';
import { ReactComponent as Personnel } from '../../assets/images/Personnel.svg';
import { ReactComponent as Pin } from '../../assets/images/Pin.svg';
import { ReactComponent as Calendar } from '../../assets/images/Calendar.svg';
import axios from 'axios';

// 소모임 생성 버튼 컴포넌트
const WriteButton = ({ onWrite }) => {
  return (
    <button className="club-header-writebutton" onClick={onWrite}>
      소모임 만들기
    </button>
  );
};

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};

// 소모임 목록 컴포넌트
const Clublist = ({ clubs, onDetail }) => {
  return (
    <div className="club-clublist-container">
      <ul className="club-clubist">
        {clubs.map((club) => (
          <li
            key={club.club_id}
            className="club-clublist-clubitem-container"
            onClick={() => onDetail(club.club_id)}
          >
            {club.club_status === '마감' && (
              <div className="club-clublist-clubitem-status">마감</div>
            )}
            <img
              src={club.club_image || DefaultPostImg}
              alt={club.club_name}
              className="club-clublist-clubitem-clubimage"
            />
            <div className="club-clublist-clubitem-clubbox-titlebox">
              <div className="club-clublist-clubitem-clubbox-title">
                {club.club_name}
              </div>
              <div className="club-clublist-clubitem-clubbox-date">
                <Calendar className="club-clublist-clubbox-date-icon" />
                {formatDate(club.club_date)}
              </div>
              <div className="club-clublist-clubbox-member">
                <Personnel className="club-clublist-clubbox-member-icon" />
                {club.club_participate_number}/{club.club_total_number}명
              </div>
              <div className="club-clublist-clubbox-location">
                <Pin className="club-clublist-clubbox-location-icon" />
                {club.club_place}
              </div>
            </div>
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
  const { club, sport } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [clubs, setClubs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const sportMap = {
    Soccer: 1,
    Baseball: 2,
    Basketball: 3,
    Bowling: 4,
    Badminton: 5,
    Climbing: 6,
    Boxing: 7,
    Tennis: 8,
    Cycling: 9,
    Golf: 10,
    Swimming: 11,
    Running: 12,
    Ballet: 13,
    Pilates: 14,
    Hiking: 15,
    Crossfit: 16,
    TableTennis: 17,
    Yoga: 18,
  };

  useEffect(() => {
    fetchClubs();
  }, [currentPage, filters]);

  const fetchClubs = async () => {
    const selectedSports = JSON.parse(localStorage.getItem('selectedSport'));
    const sportsName = selectedSports?.englishName || '';
    const sport_id = sportMap[sportsName];
    try {
      const response = await axios.post(`/api/club/sports/search/${sport_id}`, {
        ...filters,
        page: currentPage - 1, // 페이지 번호 추가
      });
      setClubs(response.data.clubs); // clubs 필드에서 데이터 추출
      setTotalPages(response.data.total_page_count); // total_page_count 필드에서 총 페이지 수 추출
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleWriteClick = () => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/createClub/${sport.toLowerCase()}`;
  };

  const handleClubClick = (id) => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/clubPost/${sport.toLowerCase()}/${id}`;
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchClubs(); // 페이지 변경 시 데이터 새로고침
    }
  };

  const handleFilterChange = (filterParams) => {
    setFilters(filterParams);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handleTagChange = (filterParams) => {
    setFilters(filterParams);
    setCurrentPage(1); // 태그 변경 시 첫 페이지로 이동
  };

  const handleSearch = (searchParams) => {
    setFilters(searchParams);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  return (
    <div className="club-container">
      <div className="club-header">
        <div className="club-header-name">소모임</div>
        <WriteButton onWrite={handleWriteClick} />
      </div>
      <Filter
        onFilterChange={handleFilterChange}
        onTagChange={handleTagChange}
        onSearch={handleSearch}
      />
      <Clublist clubs={clubs} onDetail={handleClubClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default Club;
