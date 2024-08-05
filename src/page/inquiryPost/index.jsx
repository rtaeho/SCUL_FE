import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as DefaultProfile } from '../../assets/images/DefaultProfile.svg';

//시간 나타내는 폼
const timeForm = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);
    const months = Math.floor(diff / 2592000000);
    const years = Math.floor(diff / 31536000000);

    if (minutes < 1) return '지금';
    if (hours < 1) return `${minutes}분 전`;
    if (days < 1) return `${hours}시간 전`;
    if (weeks < 1) return `${days}일 전`;
    if (months < 1) return `${weeks}주 전`;
    if (years < 1) return `${months}달 전`;
    return new Date(date).toLocaleDateString();
};

const InquiryPost = () => {
    const nav = useNavigate();
    const [mockInquiry, setMockInquiry] = useState({
        id: 1,
        tag: '문의',
        title: '제목입니당',
        createdAt: '2024-07-01T12:00:00Z',
        content: '게시판 300개 만들어주세요',
        nickname: '도라산너구리',
        profileImg: '',
        anwser: '웃기지마세요',
    });

    const currentUserNickname = '스트로베리';

    return (
        <div className="Post">
            <div className="post-content-wrap">
                <button className="post-board-btn" onClick={() => { nav('/inquiry') }}>
                    문의/신고 &#10095;
                </button>
                <div className="post-title-wrap">
                    <div className="post-title-1">
                        <div className="post-tag">{mockInquiry.tag}</div>
                        <div className="post-title">{mockInquiry.title}</div>
                    </div>
                    <div className="post-title-2">
                        <button
                            className="post-profile_btn"
                            onClick={() => nav(`/mypage/${mockInquiry.nickname}`)}
                        >
                            {mockInquiry.profileImg ? (
                                <img
                                    src={mockInquiry.profileImg}
                                    alt={mockInquiry.title}
                                    className="post-profileImg"
                                />
                            ) : (
                                <DefaultProfile className="post-profileImg" />
                            )}
                            <span className="post-nickname"> {mockInquiry.nickname}</span>
                        </button>
                        <span className="post-time">{timeForm(mockInquiry.createdAt)}</span>
                    </div>
                </div>

                <div className="inquiry-content">{mockInquiry.content}</div>

            </div>
            <div className="inquiry-answer">
                <div className='post-title'>답변</div>
                <div className='inquiry-answer-content'>{mockInquiry.anwser}</div>
            </div>
        </div>
    );
};

export default InquiryPost;
