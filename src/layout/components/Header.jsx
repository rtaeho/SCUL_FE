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
import { ReactComponent as DefaultProfile } from '../../assets/images/DefaultProfile.svg';
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
  DefaultProfile,
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
    // localStorage에서 로그인 상태를 확인
    const token = localStorage.getItem('token');
    if (token) {
      // 로그인 상태일 때
      setLoggedIn(true);
    } else {
      // 비로그인 상태일 때
      setLoggedIn(false);
    }
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
    localStorage.removeItem('token');
    alert('Logged out!');
    setLoggedIn(false);
    setProfileImage(null);
    setNotifications(false);
    navigate('/main');
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
                  <div className="header-sports-dropdown-contents-sport-name">
                    {sport.name}
                  </div>
                </div>
              ))}
            <hr style={{ backgroundColor: '#FFF', width: '100%', margin: 0 }} />

            <div className="header-sports-dropdown-more-icon">
              <More />
            </div>
          </div>
        )}
      </div>
      <nav className="header-nav-container">
        <ul className="header-nav-list-container">
          <li className="header-nav-list">
            <div>커뮤니티</div>
            <ul className="header-nav-list-dropdown-container">
              <li className="header-nav-list-dropdown-list">
                <Free />
                <div onClick={() => navigate('/community/free')}>
                  자유 게시판
                </div>
              </li>
              <li className="header-nav-list-dropdown-list">
                <Review />
                <div onClick={() => navigate('/community/review')}>
                  후기 게시판
                </div>
              </li>
              <li className="header-nav-list-dropdown-list">
                <Information />
                <div onClick={() => navigate('/community/info')}>
                  정보 게시판
                </div>
              </li>
            </ul>
          </li>
          <li className="header-nav-list">
            <div onClick={() => navigate('/club')}>소모임</div>
          </li>
          <li className="header-nav-list">
            <div onClick={() => navigate('/inquiry')}>문의/신고</div>
          </li>
          {loggedIn ? (
            <li className="header-nav-profile">
              <div className="header-nav-profile-image">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" id="profileImage" />
                ) : (
                  <DefaultProfile />
                )}
                {notifications && (
                  <div className="header-nav-profile-notification">N</div>
                )}
              </div>
              <ul className="header-nav-profile-dropdown-list-container">
                <li className="header-nav-profile-dropdown-list">
                  <div onClick={() => navigate('/my-page')}>
                    <Mypage />
                    마이 페이지
                  </div>
                </li>
                <li className="header-nav-profile-dropdown-list">
                  <div onClick={() => navigate('/notifications')}>
                    <Alert />
                    알림
                  </div>
                </li>
                <li className="header-nav-profile-dropdown-list">
                  <div onClick={logout}>
                    <Logout />
                    로그아웃
                  </div>
                </li>
              </ul>
            </li>
          ) : (
            <li className="header-nav-list">
              <div onClick={() => navigate('/auth')}>로그인/</div>
              <div onClick={() => navigate('/auth')}>회원가입</div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
