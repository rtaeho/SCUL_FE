import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//배너이미지
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';

//임의 배너이미지
const images = [banner1, banner2, banner3, banner4];

const Main = () => {
  const nav = useNavigate();
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

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
        <h1>커뮤니티</h1>
        <button className="moreCommunities" onClick={() => nav('/community')}>
          게시글 더보기 &#10095;
        </button>
        <div className="latestPost">
          <h2>최근 게시글</h2>
        </div>
        <div className="popularPost">
          <h2>인기 게시글</h2>
        </div>
      </div>
      <div className="clubs">
        <h1>소모임</h1>
        <button className="moreClubs" onClick={() => nav('/club')}>
          소모임 더보기 &#10095;
        </button>
      </div>
    </div>
  );
};

export default Main;
