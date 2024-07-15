import React from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>로그인</h1>
      <button onClick={() => navigate('/main')}>메인 이동</button>
    </div>
  );
};

export default Auth;
