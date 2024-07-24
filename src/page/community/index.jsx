import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// 게시판 목록 컴포넌트
const BoardList = ({ boardName }) => {
  return <div className="board-header-name">{boardName}</div>;
};

// 글 작성 버튼 컴포넌트
const WriteButton = ({ onWrite }) => {
  return (
    <button className="board-header-writebutton" onClick={onWrite}>
      글 작성
    </button>
  );
};

// 공지사항 필터 컴포넌트
const Filter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="filter">
      <label htmlFor="category">카테고리 필터: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="all">모두</option>
        <option value="general">일반</option>
        <option value="important">중요</option>
        <option value="updates">업데이트</option>
      </select>
    </div>
  );
};

// 공지사항 컴포넌트
const Notice = ({ notices }) => {
  return (
    <div className="notice">
      <h3>공지사항</h3>
      <ul>
        {notices.map((notice, index) => (
          <li key={index}>{notice}</li>
        ))}
      </ul>
    </div>
  );
};

// 게시글 목록 컴포넌트
const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

// 페이지네이션 컴포넌트
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <span>
        페이지: {currentPage} / {totalPages}
      </span>
      <div>
        {pages.map((page) => (
          <button key={page} onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)}>다음</button>
      </div>
    </div>
  );
};

// 메인 게시판 컴포넌트
const Community = () => {
  const { board } = useParams();
  const { sport } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNotices, setFilteredNotices] = useState([
    '공지사항 1',
    '공지사항 2',
  ]);
  const totalPages = 5;

  const handleWriteClick = () => {
    alert('글 작성 버튼 클릭됨');
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (category) => {
    // 필터 로직을 추가하여 공지사항을 필터링합니다.
    const allNotices = ['공지사항 1', '공지사항 2', '공지사항 3', '공지사항 4']; // 모든 공지사항
    if (category === 'all') {
      setFilteredNotices(allNotices);
    } else {
      // 예시: 필터링 로직 추가 (단순히 카테고리 이름에 따라 공지사항을 필터링합니다)
      setFilteredNotices(
        allNotices.filter((notice) => notice.includes(category))
      );
    }
  };

  const boardName =
    board === 'free'
      ? '자유 게시판'
      : board === 'review'
      ? '후기 게시판'
      : '정보 게시판';

  const posts = [
    { title: '게시글 1' },
    { title: '게시글 2' },
    { title: '게시글 3' },
  ];

  return (
    <div className="board-container">
      <div className="board-header">
        <BoardList boardName={boardName} />
        <WriteButton onWrite={handleWriteClick} />
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <Notice notices={filteredNotices} />
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Community;
