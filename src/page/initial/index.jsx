// src/page/initial/Initial.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Initial = () => {
  const navigate = useNavigate();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isUnique, setIsUnique] = useState(true);
  const [showError, setShowError] = useState(false);
  const [inputClass, setInputClass] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');

  const sports = [
    '축구',
    '야구',
    '농구',
    '볼링',
    '배드민턴',
    '클라이밍',
    '복싱',
    '테니스',
    '사이클',
    '골프',
    '수영',
    '런닝',
    '발레',
    '필라테스',
    '등산',
    '크로스핏',
    '탁구',
    '요가',
  ];

  const validateNickname = (name) => {
    if (!/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,12}$/.test(name)) {
      alert('한글, 영어, 숫자포함 3자~12자 가능합니다');
      setInputClass('error');
      return false;
    }
    setInputClass('');
    return true;
  };

  const checkNicknameUnique = async (name) => {
    try {
      const response = await axios.get(`/user/check-nickname/${name}`);
      setIsUnique(response.data.boolean);
      setInputClass(response.data.boolean ? 'success' : 'error');
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
    }
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
    setInputClass('');
    setShowError(false);
  };

  const handleCheckNickname = () => {
    setShowError(true);
    if (validateNickname(nickname)) {
      checkNicknameUnique(nickname);
    } else {
      setIsUnique(true);
    }
  };

  const handleButtonClick = (button) => {
    setSelectedButtons((prevSelected) => {
      if (prevSelected.includes(button)) {
        return prevSelected.filter((item) => item !== button);
      } else {
        if (prevSelected.length < 5) {
          return [...prevSelected, button];
        } else {
          alert('최대 5개까지 선택 가능합니다.');
          return prevSelected;
        }
      }
    });
  };

  const getBadgeNumber = (button) => {
    return selectedButtons.indexOf(button) + 1;
  };

  const handleComplete = async () => {
    if (inputClass !== 'success') {
      alert('중복확인을 완료해야 합니다');
      return;
    }

    try {
      // 사용자 정보를 제출합니다.
      const response = await axios.post('/auth/join/submit-info', {
        name,
        gender,
        age,
        region,
        nickname,
        sports: selectedButtons,
      });

      // 백엔드에서 토큰을 처리하고 메인 페이지로 리다이렉트합니다.
      // 추가적인 동작은 백엔드에서 처리합니다.
      navigate('/main');
    } catch (error) {
      console.error('회원 정보 제출 오류:', error);
    }
  };

  return (
    <div className="Initial">
      <div className="nickWrap">
        <h2 className="nickSet">초기 설정</h2>
        <div className="inputWrap">
          <input
            placeholder="이름"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="성별"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            placeholder="나이"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            placeholder="지역"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <input
            placeholder="닉네임"
            type="text"
            value={nickname}
            onChange={handleChange}
            className={`${inputClass} ${isFocused ? 'focused' : ''}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button className="redund" onClick={handleCheckNickname}>
            중복확인
          </button>
        </div>
        {showError && !isUnique && (
          <div className="message">이미 존재하는 닉네임입니다</div>
        )}
        {showError && isUnique && inputClass === 'success' && (
          <div className="successMessage">사용가능한 닉네임입니다</div>
        )}
      </div>
      <div className="pickSports">
        <h2 className="sportsSet">선호 종목 선택</h2>
        <h4 className="sportsSetInfo">
          최대 5개까지 설정 가능합니다. 추후에 변경 가능합니다.
        </h4>
        <div className="btnContainer">
          {sports.map((button) => (
            <div key={button} className="buttonWrap">
              <button
                className={`sportsButton ${
                  selectedButtons.includes(button) ? 'selectedSportsButton' : ''
                }`}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
              {selectedButtons.includes(button) && (
                <span className="badge">{getBadgeNumber(button)}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="submitButton" onClick={handleComplete}>
        완료
      </button>
    </div>
  );
};

export default Initial;
