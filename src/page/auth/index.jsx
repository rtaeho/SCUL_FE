import React, { useState } from 'react';
import { ReactComponent as Kakao } from '../../assets/images/Kakao.svg';
import { ReactComponent as Google } from '../../assets/images/Google.svg';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const kakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  const googleLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
    const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
    window.location.href = googleURL;
  };

  const toggleAuthState = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="Auth">
      <h2 className="h2_wrap">{isSignUp ? '회원가입' : '로그인'}</h2>
      <div className="wrap">
        <button onClick={kakaoLogin} className="kakaoLogin">
          <Kakao className="kLogo" />
          카카오로 {isSignUp ? '시작하기' : '로그인'}
        </button>
      </div>
      <div className="wrap">
        <button onClick={googleLogin} className="googleLogin">
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
