import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ReactComponent as Select } from '../../assets/images/FilterSelect.svg';
import { ReactComponent as Search } from '../../assets/images/FilterSearch.svg';
import { ReactComponent as ViewsIcon } from '../../assets/images/ViewsIcon.svg';
import { ReactComponent as LikesIcon } from '../../assets/images/LikesIcon.svg';
import { ReactComponent as NextIcon } from '../../assets/images/Next.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';

const tags = {
  free: ['전체'],
  review: ['전체', '소모임', '용품', '운동', '시설'],
  info: ['전체', '대회', '경기 일정', '경기 결과'],
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
    <div className="board-postlist-container">
      <ul className="board-postist">
        {posts.map((post, index) => (
          <li key={post.id} className="board-postlist-postitem-container">
            {post.isAd ? (
              <div className="board-postlist-postitem-ad">
                <img
                  src={post.imageUrl || DefaultPostImg}
                  alt="adimg"
                  className="board-postlist-postitem-adimage"
                />

                <div className="board-postlist-ad-adbox">
                  <div className="board-postlist-ad-adbox-titlebox">
                    <div className="board-postlist-ad-adbox-titlebox-tag">
                      {post.tag}
                    </div>
                    <div className="board-postlist-ad-adbox-titlebox-title">
                      {post.title}
                    </div>
                  </div>
                  <div className="board-postlist-ad-adbox-infobox">
                    <div className="board-postlist-ad-adbox-infobox-nickname">
                      {post.nickname}
                    </div>
                    <div
                      className="board-postlist-ad-adbox-infobox-link"
                      onClick={() => handleAdClick(post.link)}
                    >
                      {post.link}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="board-postlist-postitem-post">
                <img
                  src={post.imageUrl || DefaultPostImg}
                  alt={post.title}
                  className="board-postlist-postitem-postimage"
                />
                <div className="board-postlist-postitem-postbox">
                  <div className="board-postlist-postitem-postbox-titlebox">
                    <div className="board-postlist-postitem-postbox-titlebox-tag">
                      {post.tag}
                    </div>
                    <div className="board-postlist-postitem-postbox-titlebox-title">
                      {post.title}
                    </div>
                    {post.comments > 0 && (
                      <div className="board-postlist-postitem-postbox-titlebox-comments">
                        {post.comments}
                      </div>
                    )}
                  </div>
                  <div className="board-postlist-postitem-infobox">
                    <div className="board-postlist-postitem-infobox-nickname">
                      {post.nickname}
                    </div>
                    <div className="board-postlist-postitem-infobxo-dot">·</div>
                    <div className="board-postlist-postitem-infobox-time">
                      {timeForm(post.createdAt)}
                    </div>
                    <div className="board-postlist-postitem-infobxo-dot">·</div>
                    <ViewsIcon className="board-postlist-postitem-infobox-view-icon" />
                    <div className="postViboard-postlist-postitem-infobox-view">
                      {post.views}{' '}
                    </div>
                    <div className="board-postlist-postitem-infobxo-dot">·</div>
                    <LikesIcon className="board-postlist-postitem-infobox-like-icon" />
                    {post.likes > 0 && (
                      <div className="board-postlist-postitem-infobox-like">
                        {post.likes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {index < posts.length - 1 && (
              <hr className="board-postlist-divider" />
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
    <div className="board-pagination-container">
      <div className="board-pagination-box">
        {startPage > 1 && (
          <div
            className="board-pagination-previcon-box"
            onClick={handlePrevGroup}
          >
            <NextIcon className="board-pagination-previcon" />
          </div>
        )}
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? 'board-pagination-selectedpage'
                : 'board-pagination-page'
            }
          >
            {page}
          </div>
        ))}
        {endPage < totalPages && (
          <div
            className="board-pagination-nexticon-box"
            onClick={handleNextGroup}
          >
            <NextIcon className="board-pagination-nexticon" />
          </div>
        )}
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

  // 현재 게시판에 맞는 태그 배열 선택
  const currentTags = tags[board] || [];
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
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/createpost/${sport.toLowerCase()}`;
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
      <Postlist posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default Community;
