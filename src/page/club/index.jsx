import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ReactComponent as NextIcon } from '../../assets/images/Next.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';
import Filter from './filter/index.jsx';
import { ReactComponent as Personnel } from '../../assets/images/Personnel.svg';
import { ReactComponent as Pin } from '../../assets/images/Pin.svg';
import { ReactComponent as Calendar } from '../../assets/images/Calendar.svg';
// 소모임 생성 버튼 컴포넌트
const WriteButton = ({ onWrite }) => {
  return (
    <button className="club-header-writebutton" onClick={onWrite}>
      소모임 만들기
    </button>
  );
};

// 소모임 목록 컴포넌트
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};
const Postlist = ({ posts, onDetail }) => {
  return (
    <div className="club-postlist-container">
      <ul className="club-postist">
        {posts.map((club) => (
          <li
            key={club.id}
            className="club-postlist-postitem-container"
            onClick={() => {
              onDetail(club.id);
            }}
          >
            {club.status === '마감' && (
              <div className="club-postlist-postitem-status">마감</div>
            )}
            <img
              src={club.imageUrl || DefaultPostImg}
              alt={club.title}
              className="club-postlist-postitem-postimage"
            />
            <div className="club-postlist-postitem-postbox-titlebox">
              <div className="club-postlist-postitem-postbox-title">
                {club.title}
              </div>

              <div className="club-postlist-postitem-postbox-date">
                <Calendar className="club-postlist-postitem-postbox-date-icon" />
                {formatDate(club.date)}
              </div>

              <div className="club-postlist-postitem-postbox-member">
                <Personnel className="club-postlist-postitem-postbox-member-icon" />
                {club.member}명
              </div>

              <div className="club-postlist-postitem-postbox-location">
                <Pin className="club-postlist-postitem-postbox-location-icon" />
                {club.location}
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
  const totalPages = Math.ceil(60 / 8); // 총 60개의 목업 데이터와 한 페이지에 8개씩

  // 목업 데이터
  const mockPosts = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    imageUrl: ``,
    title: `소모임 제목 ${i + 1}`,
    nickname: `작성자 ${i + 1}`,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(), // 임의의 날짜
    member: Math.floor(Math.random() * 50) + 1, // 1~50명의 멤버
    location: `위치 ${i + 1}`,
    status: Math.random() > 0.5 ? '모집중' : '마감',
  }));

  useEffect(() => {
    // 페이지에 맞는 게시물 목록을 필터링
    const startIdx = (currentPage - 1) * 8;
    const posts = [...mockPosts.slice(startIdx, startIdx + 8)];
    setPosts(posts);
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
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/createClub/${sport.toLowerCase()}`;
  };

  const handlePostClick = (id) => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/clubPost/${sport.toLowerCase()}/${id}`;
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
      <Postlist posts={posts} onDetail={handlePostClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default Club;
