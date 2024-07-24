import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Initial = () => {
  const nav = useNavigate();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isUnique, setIsUnique] = useState(true);
  const [showError, setShowError] = useState(false);
  const [inputClass, setInputClass] = useState('');

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

  // 이미 존재하는 닉네임 예시
  const existingNicknames = ['user1', 'user2', 'user3'];

  const validateNickname = (name) => {
    if (!/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,12}$/.test(name)) {
      alert('한글, 영어, 숫자포함 3자~12자 가능합니다');
      setInputClass('error');
      return false;
    }
    setInputClass('');
    return true;
  };

  const checkNicknameUnique = (name) => {
    if (existingNicknames.includes(name)) {
      setIsUnique(false);
      setInputClass('error');
      return false;
    }
    setIsUnique(true);
    setInputClass('success');
    return true;
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
    setInputClass(''); // 입력 변경시 클래스 초기화
    setShowError(false); // 에러 메시지 초기화
  };

  const handleCheckNickname = () => {
    setShowError(true);
    if (validateNickname(nickname)) {
      checkNicknameUnique(nickname);
    } else {
      // 불가능한 닉네임일경우, 중복검사실행안함
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

  //설정완료 중복확인여부체크
  const handleComplete = () => {
    if (inputClass !== 'success') {
      alert('중복확인을 완료해야 합니다');
      return;
    }
    nav('/main');
  };

  return (
    <div className="Initial">
      <div className="nickWrap">
        <h2 className="nickSet">닉네임 설정</h2>
        <div className="inputWrap">
          <input
            placeholder="닉네임은 한글, 영어, 숫자포함 3자에서 12자까지 설정할 수 있어요"
            type="text"
            value={nickname}
            onChange={handleChange}
            className={`${inputClass} ${isFocused ? 'focused' : ''}`}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
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
      <div className="wrap">
        <button className="initialComplete" onClick={handleComplete}>
          설정완료
        </button>
      </div>
    </div>
  );
};

export default Initial;
