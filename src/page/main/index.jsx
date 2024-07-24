import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Postlist from '../../layout/components/Postlist';

//배너이미지
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';

//임의 배너이미지
const images = [banner1, banner2, banner3, banner4];

//게시글 mockdata
const mockPosts = [
  {
    id: 1,
    tag: '공지',
    title: '게시글 1',
    summary: '게시글 요약 1',
    createdAt: '2024-07-01T12:00:00Z',
    likes: 10,
    views: 100,
    comments: 5, // 댓글 수 추가
    nickname: '작성자1',
  },
  {
    id: 2,
    tag: '이벤트',
    title: '제목이예용',
    summary: '게시글 요약 1',
    createdAt: '2024-05-27T21:29:00Z',
    likes: 20,
    views: 50,
    comments: 0, // 댓글 수 추가
    nickname: '작성자2',
  },
  {
    id: 3,
    tag: '공지',
    title: '게시글!ㅎ',
    summary: '게시글 요약 1',
    createdAt: '2024-03-03T12:00:00Z',
    likes: 5,
    views: 200,
    comments: 12, // 댓글 수 추가
    nickname: '작성자3',
  },
  {
    id: 4,
    tag: '대회 일정',
    title: '게시글 3',
    summary: '게시글 요약 1',
    createdAt: '2024-07-20T19:21:00Z',
    likes: 20,
    views: 30,
    comments: 48, // 댓글 수 추가
    nickname: '작성자12',
  },
  {
    id: 5,
    tag: '자유',
    title: '게시글입니다',
    summary: '게시글 요약',
    createdAt: '2024-07-23T15:20:00Z',
    likes: 0,
    views: 3,
    comments: 0, // 댓글 수 추가
    nickname: '작성자12321',
  },
  {
    id: 6,
    tag: '경기 결과',
    title: '우리팀 개조졌다 어떡하냐 열라 큰일인데',
    summary: '게시글 요약',
    createdAt: '2024-07-13T03:30:00Z',
    likes: 300,
    views: 1576,
    comments: 48, // 댓글 수 추가
    nickname: '데박이',
  },
  // 더 많은 게시글...
];

const Main = ({ sport }) => {
  const nav = useNavigate();
  const [current, setCurrent] = useState(0);
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  useEffect(() => {
    const sortedByLatest = [...mockPosts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    setLatestPosts(sortedByLatest);

    const sortedByLikes = [...mockPosts]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);
    setPopularPosts(sortedByLikes);
  }, []);

  return (
    <div className="Main">
      <div className="banners">
        <button className="banner-arrow left-arrow" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="banner-arrow right-arrow" onClick={nextSlide}>
          &#10095;
        </button>
        {images.map((image, index) => (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <div className="image-container">
                <img src={image} alt={`slide ${index}`} className="image" />
              </div>
            )}
          </div>
        ))}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === current ? 'dot active' : 'dot'}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="posts">
        <div className="postsHead">
          <h1>커뮤니티</h1>
          <button className="moreCommunities" onClick={() => nav('/community')}>
            게시글 더보기 &#10095;
          </button>
        </div>
        <div className="postsContents">
          <div className="latestPost">
            <h2>최근 게시글</h2>
            <Postlist posts={latestPosts} />
          </div>
          <div className="popularPost">
            <h2>인기 게시글</h2>
            <Postlist posts={popularPosts} />
          </div>
        </div>
      </div>
      <div className="clubs">
        <div className="postsHead">
          <h1>소모임</h1>
          <button className="moreClubs" onClick={() => nav('/club')}>
            소모임 더보기 &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
