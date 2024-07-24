import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // const code = new URL(window.location.href).searchParams.get('code');
      // if (code) {
      //   try {
      //     const response = await axios.post(
      //       'https://your-backend.com/api/auth/google/callback',
      //       { code }
      //     );
      //     const { token, userType } = response.data;
      //     localStorage.setItem('token', token);
      localStorage.setItem('token', 'mokup-token');

      //     if (userType === 'new') {
      navigate('/initial'); // 회원가입 필요
      //     } else {
      //       navigate('/main'); // 로그인 후 메인 페이지
      //     }
      //   } catch (error) {
      //     console.error('구글 로그인 실패:', error);
      //     // 실패 시 처리 로직
      //   }
      // }
    };

    handleGoogleCallback();
  }, [navigate]);
};

export default GoogleRedirect;
