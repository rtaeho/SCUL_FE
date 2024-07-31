// src/page/auth/OAuthRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const provider = new URL(window.location.href).searchParams.get(
        'provider'
      );

      if (code && provider) {
        try {
          const response = await axios.post('/oauth2/google', {
            code,
            provider,
          });
          const { redirectUrl } = response.data;
          navigate(redirectUrl);
        } catch (error) {
          console.error('로그인 실패:', error);
        }
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return null; // 화면에 아무것도 표시하지 않음
};

export default OAuthRedirect;
