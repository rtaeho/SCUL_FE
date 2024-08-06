import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Postlist from '../../layout/components/Postlist';
import Clublist from '../../layout/components/Clubslist';

//배너이미지
import banner5 from '../../assets/images/banner5.jpg';
import banner6 from '../../assets/images/banner6.jpg';
import banner7 from '../../assets/images/banner7.jpg';
import banner8 from '../../assets/images/banner8.jpg';
import banner9 from '../../assets/images/banner9.jpg';
import axios from 'axios';

//배너 mockdata
const images = [banner5, banner6, banner7, banner8, banner9];

//실제 배너배열
// const bannerImages = [];

const Main = () => {
  const nav = useNavigate();
  const { sport } = useParams();
  const [current, setCurrent] = useState(0);
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [latestClubs, setLatestClubs] = useState([]);
  const selectedSports = JSON.parse(localStorage.getItem('selectedSport'));
  const sportsName = selectedSports?.name || '';

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get(`/api/recent-posts/${sportsName}`);
      console.log('반환', response.data);
      const data = response.data.map((post) => ({
        id: post.post_id,
        nickname: post.nickname,
        boardName: post.tag_name,
        title: post.post_title,
        createdAt: post.created_at,
        likes: post.like_count,
        views: post.post_view,
        comments: post.comment_count,
        imageUrl: post.image_url,
      }));

      // 변환된 데이터를 상태에 설정
      setLatestPosts(data);
    } catch (error) {
      console.error('최신 게시글 패치 오류:', error);
    }
  };
  const fetchPopularPosts = async () => {
    try {
      const response = await axios.get(`/api/hot-posts/${sportsName}`);
      console.log('반환', response.data);
      const data = response.data.map((post) => ({
        id: post.post_id,
        nickname: post.nickname,
        boardName: post.tag_name,
        title: post.post_title,
        createdAt: post.created_at,
        likes: post.like_count,
        views: post.post_view,
        comments: post.comment_count,
        imageUrl: post.image_url,
      }));
      setPopularPosts(data);
      console.log('qksghks1', response.data);
    } catch (error) {
      console.error('인기 게시글 패치 오류:', error);
    }
  };
  const sportMap = {
    soccer: 1,
    baseball: 2,
    basketball: 3,
    bowling: 4,
    badminton: 5,
    climbing: 6,
    boxing: 7,
    tennis: 8,
    cycling: 9,
    golf: 10,
    swimming: 11,
    running: 12,
    ballet: 13,
    pilates: 14,
    hiking: 15,
    crossfit: 16,
    tabletennis: 17,
    yoga: 18,
  };

  const fetchLatestClubs = async () => {
    try {
      const sport_id = sportMap[sport];
      console.log(sport);
      const response = await axios.get(`/api/api/club/sports/${sport_id}`);
      setLatestClubs(response.data);
    } catch (error) {
      console.error('클럽 게시글 패치 오류:', error);
    }
  };
  useEffect(() => {
    fetchLatestClubs();
    fetchLatestPosts();
    fetchPopularPosts();
  }, []);
  //***ㅡㅡㅡ ↓↓ API ↓↓ ㅡㅡㅡ***//

  //작동하는지는? 몰?루

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

  const handlePostClick = (board, id) => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/post/${board}/${sport.toLowerCase()}/${id}`;
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  //***ㅡㅡㅡ ↓↓ mockdata ↓↓ ㅡㅡㅡ***//

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
          <button
            className="moreCommunities"
            onClick={() => {
              nav(`/community/free/${sport.toLowerCase()}`);
            }}
          >
            게시글 더보기 &#10095;
          </button>
        </div>
        <div className="postsContents">
          <div className="latestPost">
            <h2>최근 게시글</h2>
            <Postlist posts={latestPosts} onDetail={handlePostClick} />
          </div>
          <div className="popularPost">
            <h2>인기 게시글</h2>
            <Postlist posts={popularPosts} onDetail={handlePostClick} />
          </div>
        </div>
      </div>
      <div className="clubs">
        <div className="clubsHead">
          <h1>소모임</h1>
          <button
            className="moreClubs"
            onClick={() => {
              nav(`/club/${sport.toLowerCase()}`);
            }}
          >
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
