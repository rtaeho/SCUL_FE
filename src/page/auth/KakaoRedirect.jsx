// src/page/auth/OAuthRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      //   const code = new URL(window.location.href).searchParams.get('code');
      //   if (code) {
      //     try {
      //       const response = await axios.post(
      //         'https://your-backend.com/api/auth/kakao/callback', // 백엔드 API URL
      //         { code }
      //       );
      //       const { token, userType } = response.data;
      localStorage.setItem('token', 'mokup-token');

      //       if (userType === 'new') {
      navigate('/initial'); // 회원가입 필요
      //       } else if (userType === 'existing') {
      //         navigate('/main'); // 로그인 후 메인 페이지
      //       }
      //     } catch (error) {
      //       console.error('카카오 로그인 실패:', error);
      //     }
      //   }
    };

    handleKakaoCallback();
  }, [navigate]);
};

export default OAuthRedirect;
