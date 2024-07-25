import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Postlist from '../../layout/components/Postlist';
import Clublist from '../../layout/components/Clubslist';

//배너이미지(mock)
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';

//배너 mockdata
const images = [banner1, banner2, banner3, banner4];

//게시글 mockdata
const mockPosts = [
  {
    id: 1,
    tag: '정보',
    title: '게시글 1',
    createdAt: '2024-07-01T12:00:00Z',
    likes: 10,
    views: 100,
    comments: 5,
    nickname: '작성자1',
  },
  {
    id: 2,
    tag: '자유',
    title: '제목이예용',
    createdAt: '2024-05-27T21:29:00Z',
    likes: 20,
    views: 50,
    comments: 0,
    nickname: '작성자2',
  },
  {
    id: 3,
    tag: '후기',
    title: '게시글!ㅎ',
    createdAt: '2024-03-03T12:00:00Z',
    likes: 5,
    views: 200,
    comments: 12,
    nickname: '작성자3',
  },
  {
    id: 4,
    tag: '정보',
    title: '게시글 3',
    createdAt: '2024-07-20T19:21:00Z',
    likes: 20,
    views: 30,
    comments: 48,
    nickname: '작성자12',
  },
  {
    id: 5,
    tag: '자유',
    title: '게시글입니다',
    createdAt: '2024-07-23T15:20:00Z',
    likes: 0,
    views: 3,
    comments: 2,
    nickname: '작성자12321',
  },
  {
    id: 6,
    tag: '후기',
    title: '글씨가넘어간다왜그러니어떡해어떡해어떡하나요어떡해',
    createdAt: '2024-07-13T03:30:00Z',
    likes: 300,
    views: 1576,
    comments: 48,
    nickname: '데박이',
  },
];

//소모임 mockdata
const mockClubs = [
  {
    id: 1,
    title: '축구할사람',
    date: '2024-08-01',
    capacity: 10,
    location: '서울시 강남구',
    createdAt: '2024-07-03T12:00:00Z',
  },
  {
    id: 2,
    title: '축구 경기 관람',
    date: '2024-08-05',
    capacity: 20,
    location: '경기도 수원시 영통구',
    createdAt: '2024-07-20T12:00:00Z',
  },
  {
    id: 3,
    title: '함께 축구장 ㄱㄱ?',
    date: '2024-08-12',
    capacity: 15,
    location: '경기도 과천시',
    createdAt: '2024-07-27T12:00:00Z',
  },
  {
    id: 4,
    title: '제목이 길어지면 어떻게 될지 봐야해요',
    date: '2024-08-20',
    capacity: 12,
    location: '경기도 안양시 만안구',
    createdAt: '2024-07-18T12:00:00Z',
  },
  {
    id: 5,
    title: '어쩌라고요',
    date: '2024-08-25',
    capacity: 8,
    location: '서울시 동작구',
    createdAt: '2024-07-04T12:00:00Z',
  },
  {
    id: 6,
    title: '축구할사람을 찾아요',
    date: '2024-08-06',
    capacity: 20,
    location: '서울시 서초구',
    createdAt: '2024-06-28T12:00:00Z',
  },
];

//실제 배너배열
// const bannerImages = [];

const Main = ({ sport }) => {
  const nav = useNavigate();
  const [current, setCurrent] = useState(0);
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [latestClubs, setLatestClubs] = useState([]);

  const [selectedSport, setSelectedSport] = useState(null);

  //***ㅡㅡㅡ ↓↓ API ↓↓ ㅡㅡㅡ***//

  // const [bannerImages, setBannerImages] = useState(bannerImages);

  // useEffect(() => {
  //   const savedSport = JSON.parse(localStorage.getItem('selectedSport'));
  //   setSelectedSport(savedSport);

  //   fetch('/api/selectedSport', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ sport: savedSport }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const { bannerImages, latestPosts, popularPosts, latestClubs } = data;
  //       setBannerImages(bannerImages);
  //       setLatestPosts(latestPosts);
  //       setPopularPosts(popularPosts);
  //       setLatestClubs(latestClubs);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data', error);
  //     });
  // }, []);

  //***ㅡㅡㅡ ↑↑ API ↑↑ ㅡㅡㅡ***//

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  //***ㅡㅡㅡ ↓↓ mockdata ↓↓ ㅡㅡㅡ***//

  useEffect(() => {
    const sortedByLatest = [...mockPosts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    setLatestPosts(sortedByLatest);

    const sortedByLikes = [...mockPosts]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);
    setPopularPosts(sortedByLikes);

    const sortedByLatestClub = [...mockClubs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setLatestClubs(sortedByLatestClub);
  }, []);

  //***ㅡㅡㅡ ↑↑ mockdata ↑↑ ㅡㅡㅡ***//

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
        <div className="clubsHead">
          <h1>소모임</h1>
          <button className="moreClubs" onClick={() => nav('/club')}>
            소모임 더보기 &#10095;
          </button>
        </div>
        <div className="clubsContents">
          <Clublist clubs={latestClubs} />
        </div>
      </div>
    </div>
  );
};

export default Main;
