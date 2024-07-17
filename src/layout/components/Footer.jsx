import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const nav = useNavigate();

    return (
        <div className="Footer">
            <div className="footer_btn_wrap">
                <button onClick={() => nav('/policy')}>서비스 이용약관</button>
                <p>|</p>
                <button onClick={() => nav('/policy')}>개인정보 보호 정책</button>
            </div>

            <p className="copyright">Copy right ©S-CUL All rights reserved.</p>
        </div>
    );
};

export default Footer;