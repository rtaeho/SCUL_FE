import React from 'react';
import { ReactComponent as Kakao } from '../../assets/images/Kakao.svg';
import { ReactComponent as Google } from '../../assets/images/Google.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      const response = await axios.post(`/oauth2/${provider}/redirect`);
      const { access_token, refresh_token } = response.data;

      if (access_token && refresh_token) {
        // 로그인이 완료된 후, 사용자에게 토큰을 저장하고 메인 페이지로 이동
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        // 메인 페이지로 이동
        navigate('/main');
      } else {
        console.error('Failed to get tokens');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="Auth">
      <h2 className="h2_wrap">로그인</h2>
      <div className="wrap">
        <button onClick={() => handleLogin('kakao')} className="kakaoLogin">
          <Kakao className="kLogo" />
          카카오로 로그인
        </button>
      </div>
      <div className="wrap">
        <button onClick={() => handleLogin('google')} className="googleLogin">
          <Google className="gLogo" />
          구글로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
