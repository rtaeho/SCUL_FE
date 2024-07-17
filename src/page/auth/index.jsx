import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Kakao } from '../../assets/images/Kakao.svg';
import { ReactComponent as Google } from '../../assets/images/Google.svg';

const Auth = () => {
  const navigate = useNavigate();
  /* const Login = () => {
    const REST_API_KEY = '1';
    const REDIRECT_URI = '2';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
      window.location.href = link;
    }; */

  return (
    <div className='Auth'>
      <h2 className='h2_wrap'>로그인</h2>
      <div className='wrap'>
        <button className='kakaoLogin'/*onClick={loginHandler}*/><Kakao className='kLogo' />카카오로 시작하기</button>
      </div>
      <div className='wrap'>
        <button className='googleLogin'/*onClick={loginHandler}*/><Google className='gLogo' />구글로 시작하기</button>
      </div>
      <div className='wrap'>
        <p className='nonMem_p'>비회원으로 둘러보기</p>
        <button className='nonMem' onClick={() => navigate('/main')}>홈화면으로</button>
      </div>
    </div>
  );
};

export default Auth;
