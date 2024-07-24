import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as Select } from '../../assets/images/FilterSelect.svg';
import { ReactComponent as Search } from '../../assets/images/FilterSearch.svg';

const tags = {
  free: ['전체', '소모임', '용품', '운동', '시설'],
  review: ['전체', '리뷰', '추천', '경험담'],
  info: ['전체', '공지', '이벤트', '문의'],
};

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

// 필터 컴포넌트
const Filter = ({ tags, onFilterChange, onTagChange, onSearch }) => {
  const [selectedSort, setSelectedSort] = useState('최신 순');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [selectedSearchOption, setSelectedSearchOption] = useState('제목');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setSortDropdownVisible(false);
    onFilterChange({
      sort,
      tag: selectedTag,
      searchOption: selectedSearchOption,
      keyword: searchKeyword,
    });
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    onTagChange({
      sort: selectedSort,
      tag,
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
        tag: selectedTag,
        searchOption: selectedSearchOption,
        keyword: searchKeyword,
      });
    }
  };

  return (
    <div className="board-filter-container">
      <div className="board-filter-select-container">
        <div className="board-filter-selected">{selectedSort}</div>
        <Select
          className="board-filter-select-button"
          onClick={() => setSortDropdownVisible(!sortDropdownVisible)}
        />
        {sortDropdownVisible && (
          <ul className="board-filter-select-dropdown-container">
            <li
              key="최신 순"
              className="board-filter-select-dropdown-list"
              onClick={() => handleSortChange('최신 순')}
            >
              최신 순
            </li>
            <hr className="board-filter-select-dropdown-list-hr" />
            <li
              key="조회 순"
              className="board-filter-select-dropdown-list"
              onClick={() => handleSortChange('조회 순')}
            >
              조회 순
            </li>
            <hr className="board-filter-select-dropdown-list-hr" />
            <li
              key="댓글 순"
              className="board-filter-select-dropdown-list"
              onClick={() => handleSortChange('댓글 순')}
            >
              댓글 순
            </li>
          </ul>
        )}
      </div>
      <div className="board-filter-tag-container">
        <ul className="board-filter-tag-list-container">
          {tags.map((tag) => (
            <li
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={
                selectedTag === tag
                  ? 'board-filter-tag-list-selected'
                  : 'board-filter-tag-list'
              }
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="board-filter-search-container">
        <div className="board-filter-search-select-container">
          <div
            className="board-filter-search-select-selected"
            onClick={() => setSearchDropdownVisible(!searchDropdownVisible)}
          >
            {selectedSearchOption}
            {searchDropdownVisible && (
              <ul className="board-filter-search-select-dropdown-container">
                <li
                  className="board-filter-search-select-dropdown-list"
                  onClick={() => handleSearchOptionChange('제목')}
                >
                  제목
                </li>
                <hr className="board-filter-search-select-dropdown-list-hr" />
                <li
                  className="board-filter-search-select-dropdown-list"
                  onClick={() => handleSearchOptionChange('작성자')}
                >
                  작성자
                </li>
                <hr className="board-filter-search-select-dropdown-list-hr" />
                <li
                  className="board-filter-search-select-dropdown-list"
                  onClick={() => handleSearchOptionChange('내용')}
                >
                  내용
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="board-filter-search-input-container">
          <Search className="board-filter-search-input-icon" />
          <input
            className="board-filter-search-input"
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
  const [posts, setPosts] = useState([]);
  const totalPages = 5;

  // 게시판별 태그 배열 정의
  const tags = {
    free: ['전체', '소모임', '용품', '운동', '시설'],
    review: ['전체', '리뷰', '추천', '경험담'],
    info: ['전체', '공지', '이벤트', '문의'],
  };

  // 현재 게시판에 맞는 태그 배열 선택
  const currentTags = tags[board] || [];

  useEffect(() => {
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

  const boardName =
    board === 'free'
      ? '자유 게시판'
      : board === 'review'
      ? '후기 게시판'
      : '정보 게시판';

  return (
    <div className="board-container">
      <div className="board-header">
        <BoardList boardName={boardName} />
        <WriteButton onWrite={handleWriteClick} />
      </div>
      <Filter
        tags={currentTags} // 현재 게시판에 맞는 태그 배열 전달
        onFilterChange={handleFilterChange}
        onTagChange={handleTagChange}
        onSearch={handleSearch}
      />
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
