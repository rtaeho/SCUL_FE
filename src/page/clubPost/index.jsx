import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ClubInfo } from '../../assets/images/ClubInfo.svg';
import { ReactComponent as DefaultProfile } from '../../assets/images/DefaultProfile.svg';
import { ReactComponent as GreenCheckIcon } from '../../assets/images/GreenCheckIcon.svg';
import DOMPurify from 'dompurify';
const SafeHtml = ({ htmlString }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};
// 시간 나타내는 폼
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

// 날짜 표기 변동
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}월 ${day}일`;
};

// 모달(복사)
const Modal = () => (
  <div className="modal-copyhref-club">
    <p>링크 복사가 완료되었습니다</p>
  </div>
);

// 모달(신고)
const ReportModal = ({ toggleReportModal, nickname, content }) => {
  const [reportReason, setReportReason] = useState('');

  const handleReportClick = () => {
    if (reportReason.trim() === '') {
      alert('신고 사유를 작성해주세요.');
    } else {
      alert('신고가 완료되었습니다.');
      toggleReportModal();
    }
  };

  return (
    <div className="report-modal-back" onClick={toggleReportModal}>
      <div className="modal-report" onClick={(e) => e.stopPropagation()}>
        <div className="report-head">
          <h1>신고하기</h1>
          <button onClick={toggleReportModal}>&#x2715;</button>
        </div>
        <div className="report-nickname">
          <p>작성자</p> {nickname}
        </div>
        <div className="report-content">
          <p>내용</p>
          <div className="report-content-in">{content}</div>
        </div>
        <div className="report-reason">
          <p>신고 사유</p>
          <textarea
            placeholder="신고 사유를 작성해 주세요"
            maxLength="178"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="input-report"
          />
        </div>
        <div className="report-btn">
          <button className="submit-report" onClick={handleReportClick}>
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

const ClubSignUpModal = ({
  handleIsSignUpClick,
  toggleSignUpModal,
  nickname,
  content,
}) => {
  const [introduce, setIntroduce] = useState('');

  const handleSignUpClick = () => {
    if (introduce.trim() === '') {
      alert('자기 소개를 작성해주세요.');
    } else {
      alert('소모임 신청이 완료되었습니다.');
      handleIsSignUpClick();
    }
  };

  return (
    <div className="report-modal-back" onClick={toggleSignUpModal}>
      <div className="modal-report" onClick={(e) => e.stopPropagation()}>
        <div className="report-head">
          <h1>소모임 신청</h1>
          <button onClick={toggleSignUpModal}>&#x2715;</button>
        </div>
        <div className="report-nickname">
          <p>작성자</p> {nickname}
        </div>
        <div className="report-content">
          <p>소모임</p>
          <div className="report-content-in">{content}</div>
        </div>
        <div className="report-reason">
          <p>자기 소개</p>
          <textarea
            placeholder="간단하게 본인을 소개해 주세요"
            maxLength="178"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            className="input-report"
          />
        </div>
        <div className="report-btn">
          <button className="submit-report" onClick={handleSignUpClick}>
            신청완료
          </button>
        </div>
      </div>
    </div>
  );
};

const ClubPost = () => {
  const nav = useNavigate();
  const { sport, club_id } = useParams();
  const [clubData, setClubData] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); // 신청완료 상태 관리
  const [modal, setModal] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const [signUpInfo, setSignUp] = useState({ nickname: '', content: '' });
  const [reportInfo, setReportInfo] = useState({ nickname: '', content: '' });
  const [isFollow, setIsFollow] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const currentUserNickname = '굴맨';
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`/api/club/${club_id}`);
        setClubData(response.data.club_response);
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, [club_id]);

  useEffect(() => {
    if (clubData) {
      const today = new Date();
      const clubDate = new Date(clubData.club_date);

      if (clubDate < today) {
        setIsClose(true);
      }
    }
  }, [clubData]);

  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => {
        setModal(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  const handleCloseClick = () => {
    if (
      window.confirm(
        '소모임을 마감하시겠습니까? \n마감된 소모임은 수정 및 복구가 불가합니다.'
      )
    ) {
      setIsClose(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setModal(true);
  };

  const handleButton = () => {
    let redirectUrl = `/club/${sport.toLowerCase()}`;
    window.location.href = redirectUrl;
  };

  const toggleFollows = () => {
    setIsFollow(!isFollow);
  };

  const toggleReportModal = (nickname = '', content = '') => {
    setReportInfo({ nickname, content });
    setModalReport(!modalReport);
  };

  const toggleSignUpModal = (nickname = '', content = '') => {
    setSignUp({ nickname, content });
    setModalSignUp(!modalSignUp);
  };

  const handleIsSignUpClick = () => {
    setIsSignedUp(true);
    setModalSignUp(false);
  };

  if (!clubData) return <div>Loading...</div>;
  return (
    <div className="ClubPost">
      <button className="club-post-board-btn" onClick={handleButton}>
        소모임 &#10095;
      </button>
      <div className="club-post-head">
        <div className="club-post-title">{clubData.club_name}</div>
        <div className="club-post-head-1">
          <button
            className="club-post-profile_btn"
            onClick={() => nav(`/mypage/${clubData.user_nickname}`)}
          >
            {clubData.club_image ? (
              <img
                src={clubData.club_image}
                alt={clubData.club_name}
                className="club-post-profileImg"
              />
            ) : (
              <DefaultProfile className="club-post-profileImg" />
            )}
            <span className="club-post-nickname">
              {' '}
              {clubData.user_nickname}
            </span>
          </button>
          {clubData.user_nickname === currentUserNickname ? (
            ''
          ) : (
            <button className="club-post-follow" onClick={toggleFollows}>
              팔로우 {isFollow ? <GreenCheckIcon /> : '+'}
            </button>
          )}
          <span className="club-post-time">
            {timeForm(clubData.created_at)}
          </span>
        </div>
      </div>
      <div className="club-post-content">
        <div className="club-post-content-1">
          <SafeHtml htmlString={clubData.club_content} />
        </div>

        <div className="club-post-content-info">
          <div className="club-post-content-2">
            <span className="club-info-content">
              <ClubInfo className="club-info-icon" />
              장소: {clubData.club_place}
            </span>
            <span className="club-info-content">
              <ClubInfo className="club-info-icon" />
              모집 마감일: {formatDate(clubData.club_date)}
            </span>
          </div>

          <div className="club-post-content-3">
            <span className="club-info-content">
              <ClubInfo className="club-info-icon" />
              모집 인원: {clubData.club_total_number}명
            </span>
            <span className="club-info-content">
              <ClubInfo className="club-info-icon" />
              비용: {clubData.club_cost.toLocaleString()}원
            </span>
          </div>

          <div className="club-post-content-4">
            <span className="club-info-content">
              <ClubInfo className="club-info-icon" />
              날짜: {formatDate(clubData.club_date)}
            </span>
          </div>
        </div>
      </div>
      {clubData.user_nickname === currentUserNickname ? (
        <div className="club-post-btns">
          {isClose ? (
            <button disabled className="club-post-closeD-btn">
              마감되었습니다
            </button>
          ) : (
            <button
              className="club-post-closING-btn"
              onClick={handleCloseClick}
            >
              마감하기
            </button>
          )}
        </div>
      ) : (
        <div className="club-post-btns">
          {isClose ? (
            <button disabled className="club-post-closeD-btn">
              마감되었습니다
            </button>
          ) : (
            <>
              <button className="club-post-chat-btn">
                <span className="chatting">채팅하기</span>
                <span className="moving">(오픈챗으로 이동)</span>
              </button>
              {isSignedUp ? (
                <button disabled className="club-post-joined-btn">
                  <span>이미 신청 완료된</span>
                  <span>소모임입니다</span>
                </button>
              ) : (
                <button
                  className="club-post-request-btn"
                  onClick={() =>
                    toggleSignUpModal(
                      clubData.user_nickname,
                      clubData.club_name
                    )
                  }
                >
                  신청하기
                </button>
              )}
            </>
          )}
        </div>
      )}

      {modal && <Modal />}
      {modalReport && (
        <ReportModal
          toggleReportModal={toggleReportModal}
          nickname={reportInfo.nickname}
          content={reportInfo.content}
        />
      )}
      {modalSignUp && (
        <ClubSignUpModal
          handleIsSignUpClick={handleIsSignUpClick}
          toggleSignUpModal={toggleSignUpModal}
          nickname={signUpInfo.nickname}
          content={signUpInfo.content}
        />
      )}

      <div className="club-post-btn">
        {clubData.user_nickname === currentUserNickname ? (
          <>
            {isClose ? (
              ''
            ) : (
              <>
                <button>수정</button>|
              </>
            )}
            <button>삭제</button>|
          </>
        ) : (
          <>
            <button
              onClick={() =>
                toggleReportModal(clubData.user_nickname, clubData.club_name)
              }
            >
              신고
            </button>
            |
          </>
        )}
        <button className="club-post-copy" onClick={handleCopy}>
          주소 복사
        </button>
      </div>
    </div>
  );
};
export default ClubPost;
