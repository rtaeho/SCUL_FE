import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Kakao } from '../../assets/images/Kakao.svg';
import { ReactComponent as Google } from '../../assets/images/Google.svg';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);

  /* const Login = () => {
    const REST_API_KEY = '1';
    const REDIRECT_URI = '2';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
      window.location.href = link;
    }; */

  const toggleAuthState = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="Auth">
      <h2 className="h2_wrap">{isSignUp ? '회원가입' : '로그인'}</h2>
      <div className="wrap">
        {/* 카카오로 로그인(시작하기)버튼누르면 일시적으로 초기설정페이지 확인 가능 */}
        <button
          onClick={() => navigate('/initial')}
          className="kakaoLogin" /*onClick={loginHandler}*/
        >
          <Kakao className="kLogo" />
          카카오로 {isSignUp ? '시작하기' : '로그인'}
        </button>
      </div>
      <div className="wrap">
        <button className="googleLogin" /*onClick={loginHandler}*/>
          <Google className="gLogo" />
          구글로 {isSignUp ? '시작하기' : '로그인'}
        </button>
      </div>
      <div className="wrap">
        <p className="nonMem_p">
          {isSignUp ? '이미 회원이신가요?' : '아직 회원이 아니신가요?'}
        </p>
        <button className="nonMem" onClick={toggleAuthState}>
          {isSignUp ? '로그인' : '회원가입'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
