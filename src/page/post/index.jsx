import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ViewsIcon } from '../../assets/images/ViewsIcon.svg';
import { ReactComponent as LikesIcon_Red } from '../../assets/images/LikesIcon_Red.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/ChatIcon.svg';
import { ReactComponent as LikesIcon_Red_Full } from '../../assets/images/LikesIcon_Red_Full.svg';
import DefaultProfile from '../../assets/images/DefaultProfile.svg';

//시간 나타내는 폼
const timeForm = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);
    const months = Math.floor(diff / 2592000000);

    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    if (weeks < 4) return `${weeks}주 전`;
    if (months < 12) return `${months}달 전`;
    return new Date(date).toLocaleDateString();
};

//게시글 mockdata
const mockPost = {
    id: 1,
    board: '자유',
    tag: '용품',
    title: '게시글 1',
    createdAt: '2024-07-01T12:00:00Z',
    likes: 10,
    views: 100,
    comments: 5,
    content: '게시글내용입니다 게시글 내용 게시글 내용입니다',
    nickname: '작성자1',
    profileImg: '',
    comment: [{
        picture: '이미지',
        nickname: '도라산너구리',
        content: '비밀 댓글입니다',
        createdAt: '2024-07-12T12:00:00Z',
    },
    {
        picture: '이미지',
        nickname: '도라산너구리',
        content: '비밀 댓글입니다',
        createdAt: '2024-07-19T12:00:00Z',
    },
    {
        picture: '이미지',
        nickname: '도라산너구리',
        content: '비밀 댓글입니다',
        createdAt: '2024-07-29T12:00:00Z',
    }],
}

//모달(복사)
function Modal() {
    return (
        <div className="modal-copyhref">
            <p>링크 복사가 완료되었습니다</p>
        </div>
    )
}

const Post = () => {
    const nav = useNavigate();
    const { sport } = useParams();
    const [isLike, setIsLike] = useState(false);
    const [modal, setModal] = useState(false);


    const currentUrl = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl)

        // 알림을 표시합니다.
        setModal(true);

        // 1초 후에 알림을 서서히 사라지게 합니다.
        setTimeout(() => {
            setModal(false);
        }, 1000);
    };

    const toggleModal = () => {
        setModal(true);
        setTimeout(() => {
            setModal(false);
        }, 3000);
    }

    const toggleLikes = () => {
        setIsLike(!isLike);
        if (isLike === false) {
            mockPost.likes += 1;
            return;
        }
        if (isLike === true) {
            mockPost.likes -= 1;
            return;
        }

    };

    const handleButton = async () => {

        let redirectUrl = '';
        switch (mockPost.board) {
            case '자유':
                redirectUrl = `/community/free/${sport.toLowerCase()}`;
                break;
            case '후기':
                redirectUrl = `/community/review/${sport.toLowerCase()}`;
                break;
            case '정보':
                redirectUrl = `/community/info/${sport.toLowerCase()}`;
                break;
            default:
                redirectUrl = '/';
        }
        window.location.href = redirectUrl;
    }

    return <div className='Post'>
        <div className='post-content-wrap'>
            <button className='post-board-btn' onClick={handleButton}> {mockPost.board} 게시판 &#10095;</button>
            <div className='post-title-wrap'>
                <div className='post-title-1'>
                    <div className="post-tag">{mockPost.tag}</div>
                    <div className="post-title">{mockPost.title}</div>
                </div>
                <div className="post-title-2">
                    <button className='post-profile_btn'><img
                        src={mockPost.profileImg || DefaultProfile}
                        alt={mockPost.title}
                        className='post-profileImg'
                    /> <span className="postNickname"> {mockPost.nickname}</span></button>
                    <button className='post-follow'>팔로우 +</button>
                    <span className="post-time">{timeForm(mockPost.createdAt)}</span>
                    <span className="post-views">
                        · <ViewsIcon className="viewIcon" /> {mockPost.views}
                    </span>
                </div>
            </div>

            <div className="post-content">{mockPost.content}</div>
            <div className='modal'>{
                modal === true ? <Modal /> : null
            }</div>
            <div className='post-btn'>
                <div className='post-btn1'>
                    <button className="post-likes" onClick={toggleLikes}>
                        {isLike ? <LikesIcon_Red_Full className="likes-redIcon" /> : <LikesIcon_Red className="likes-redIcon" />} <span className='likes1'>좋아요</span> <span className='likes2'>{mockPost.likes}</span>
                    </button>
                    <span className='post-comments'>
                        <ChatIcon className='chatIcon' />
                        <span className='comments1'>댓글</span><span className='comments2'>{mockPost.comments}</span>
                    </span>
                </div>
                <div className='post-btn2'>
                    <button>수정</button>|
                    <button>삭제</button>|
                    <button onClick={handleCopy}>주소 복사</button>
                </div>
            </div>
        </div>
        <div className='post-comment'></div>
        <div className='more-post'></div>
    </div>;
};

export default Post;