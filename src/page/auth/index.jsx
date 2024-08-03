import React, { useEffect } from 'react';
import { ReactComponent as Kakao } from '../../assets/images/Kakao.svg';
import { ReactComponent as Google } from '../../assets/images/Google.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const navigate = useNavigate();

  // 리디렉션 후 URL에서 code 파라미터 추출 및 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const fetchTokens = async () => {
        try {
          const res = await axios.get(`/oauth2/google?code=${code}`);
          const { access_token, refresh_token, is_member } = res.data;
          console.log(
            res.data,
            'access:',
            access_token,
            'refresh:',
            refresh_token
          );
          if (access_token && refresh_token) {
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
          }

          if (is_member) {
            navigate('/main');
          } else {
            localStorage.setItem('usercode', code);
            navigate('/initial');
          }
        } catch (error) {
          console.error('Error fetching tokens:', error);
        }
      };

      fetchTokens();
    }
  }, [navigate]);

  const handleLogin = (provider) => {
    if (provider === 'google') {
      window.location.href = `http://ec2-43-200-254-45.ap-northeast-2.compute.amazonaws.com:8080/oauth2/google/redirect`;
    } else if (provider === 'kakao') {
      window.location.href = `http://ec2-43-200-254-45.ap-northeast-2.compute.amazonaws.com:8080/oauth2/kakao/redirect`;
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
