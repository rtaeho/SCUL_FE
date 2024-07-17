import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom을 사용하여 라우팅 구현
// SVG 파일을 import
import { ReactComponent as Soccer } from '../../assets/images/Soccer.svg';
import { ReactComponent as Select } from '../../assets/images/Select.svg';
import { ReactComponent as Review } from '../../assets/images/Review.svg';
import { ReactComponent as Mypage } from '../../assets/images/Mypage.svg';
import { ReactComponent as Logout } from '../../assets/images/Logout.svg';
import { ReactComponent as Information } from '../../assets/images/Information.svg';
import { ReactComponent as Free } from '../../assets/images/Free.svg';
import { ReactComponent as Favorite } from '../../assets/images/Favorite.svg';
import { ReactComponent as Default_Profile } from '../../assets/images/Default_Profile.svg';
import { ReactComponent as Basketball } from '../../assets/images/Basketball.svg';
import { ReactComponent as Baseball } from '../../assets/images/Baseball.svg';
import { ReactComponent as Badminton } from '../../assets/images/Badminton.svg';
import { ReactComponent as Alert } from '../../assets/images/Alert.svg';

// SVG 컴포넌트를 객체에 저장
const languageSvgObj = {
  Soccer,
  Select,
  Review,
  Mypage,
  Logout,
  Information,
  Free,
  Favorite,
  Default_Profile,
  Basketball,
  Baseball,
  Badminton,
  Alert,
};
const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState(false);
  const [sports, setSports] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // 로그인 상태를 확인하고 상태를 업데이트하는 로직을 추가
    setLoggedIn(true);
    setProfileImage(null); // 실제 프로필 이미지 URL이 있으면 설정
    setNotifications(true); // 알림이 있는 경우

    // 비회원일 경우 가장 많이 선택한 스포츠
    if (!loggedIn) {
      setSports(['Soccer', 'Baseball', 'Basketball', 'Badminton']);
    } else {
      // 회원일 경우 회원이 선택한 스포츠 (우선순위 설정에 따라)
      setSports(['Badminton', 'Basketball', 'Baseball', 'Soccer']); // 실제 데이터에 맞게 수정 필요
    }
  }, [loggedIn]);

  const goHome = () => {
    navigate('/');
  };

  const logout = () => {
    alert('Logged out!');
    setLoggedIn(false);
    setProfileImage(null);
    setNotifications(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderSportIcon = (sport) => {
    const SvgComponent = languageSvgObj[sport];
    return SvgComponent ? <SvgComponent /> : null;
  };

  return (
    <header className="header">
      <div className="logo" onClick={goHome}>
        S-CUL
      </div>
      <div className="sports-dropdown">
        {renderSportIcon(sports[0])}
        {sports[0]}
        <Select onClick={toggleDropdown}></Select>
        {showDropdown && (
          <div className="dropdown-content">
            {sports.slice(1, 4).map((sport, index) => (
              <a href="#" key={index}>
                {renderSportIcon(sport)}
                {sport}
              </a>
            ))}
            <a href="#" className="more">
              ...
            </a>
          </div>
        )}
      </div>
      <nav>
        <ul>
          <li className="hover-dropdown">
            <a onClick={() => navigate('/community')}>커뮤니티</a>
            <ul className="dropdown-content">
              <li>
                <a onClick={() => navigate('/community/free')}>
                  <Free />
                  자유 게시판
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/community/review')}>
                  <Review />
                  후기 게시판
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/community/info')}>
                  <Information />
                  정보 게시판
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a onClick={() => navigate('/club')}>소모임</a>
          </li>
          <li>
            <a onClick={() => navigate('/inquiry')}>문의/신고</a>
          </li>
          {loggedIn ? (
            <li className="profile-dropdown">
              {profileImage ? (
                <img src={profileImage} alt="Profile" id="profileImage" />
              ) : (
                <Default_Profile />
              )}
              {notifications && <div className="notification">N</div>}
              <ul className="dropdown-content">
                <li>
                  <a onClick={() => navigate('/my-page')}>
                    <Mypage />
                    마이 페이지
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate('/notifications')}>
                    <Alert />
                    알림
                  </a>
                </li>
                <li>
                  <a onClick={logout}>
                    <Logout />
                    로그아웃
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <li className="auth-links">
              <a>
                <a onClick={() => navigate('/login')}>로그인 /</a>
                <a onClick={() => navigate('/signup')}>회원가입</a>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
