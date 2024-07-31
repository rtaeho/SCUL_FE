import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ReactComponent as ViewsIcon } from '../../assets/images/ViewsIcon.svg';
import { ReactComponent as LikesIcon } from '../../assets/images/LikesIcon.svg';
import { ReactComponent as NextIcon } from '../../assets/images/Next.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';
import Filter from './filter/index.jsx';
// 소모임 생성 버튼 컴포넌트
const WriteButton = ({ onWrite }) => {
  return (
    <button className="club-header-writebutton" onClick={onWrite}>
      소모임 만들기
    </button>
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
