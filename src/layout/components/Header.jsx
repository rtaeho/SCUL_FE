import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ReactComponent as More } from '../../assets/images/More.svg';

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
  More,
};

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState(false);
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // 여기서 로그인 상태를 확인하고 필요한 정보를 설정합니다.
    setLoggedIn(true); // 임시로 true로 설정
    setProfileImage(null); // 프로필 이미지 설정
    setNotifications(true); // 알림 설정

    const sportsList = [
      { name: '축구', icon: 'Soccer' },
      { name: '야구', icon: 'Baseball' },
      { name: '농구', icon: 'Basketball' },
      { name: '배드민턴', icon: 'Badminton' },
    ];

    setSports(sportsList);
    setSelectedSport(sportsList[0]);
  }, []);

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

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    setShowDropdown(false);
  };

  const renderSportIcon = (sport) => {
    const SvgComponent = languageSvgObj[sport.icon];
    return SvgComponent ? <SvgComponent /> : null;
  };

  return (
    <header className="header-container">
      <div className="header-logo" onClick={goHome}>
        S-CUL
      </div>
      <div className="header-sports-container">
        <div className="header-sports-dropdown-container">
          {selectedSport && renderSportIcon(selectedSport)}
          <span className="header-sports-dropdown-title">
            {selectedSport ? selectedSport.name : '선택하세요'}
          </span>
          <div
            className="header-sports-dropdown-icon-container"
            onClick={toggleDropdown}
          >
            <Select className="header-sports-dropdown-icon" />
          </div>
        </div>
        {showDropdown && (
          <div className="header-sports-dropdown-contents-container">
            {sports
              .filter((sport) => sport !== selectedSport)
              .map((sport, index) => (
                <div
                  className="header-sports-dropdown-contents-sport"
                  key={index}
                  onClick={() => handleSportSelect(sport)}
                >
                  {renderSportIcon(sport)}
                  {sport.name}
                </div>
              ))}
            <hr style={{ backgroundColor: '#FFF', width: '100%', margin: 0 }} />

            <div className="header-sports-dropdown-more-icon">
              <More />
            </div>
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
              <div className="profile-wrapper">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" id="profileImage" />
                ) : (
                  <Default_Profile />
                )}
                {notifications && <div className="notification">N</div>}
              </div>
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
                <div onClick={() => navigate('/login')}>로그인 /</div>
                <div onClick={() => navigate('/signup')}>회원가입</div>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
