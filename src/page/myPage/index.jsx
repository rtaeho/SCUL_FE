import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ProfileImage } from '../../assets/images/ProfileImage.svg';
import { ReactComponent as SoccerIcon } from '../../assets/images/Soccer.svg';
import { ReactComponent as BasketballIcon } from '../../assets/images/Basketball.svg';
import { ReactComponent as BaseballIcon } from '../../assets/images/Baseball.svg';
import { ReactComponent as BadmintonIcon } from '../../assets/images/Badminton.svg';
import { ReactComponent as BowlingIcon } from '../../assets/images/Bowling.svg';
import { ReactComponent as ClimbingIcon } from '../../assets/images/Climbing.svg';
import { ReactComponent as BoxingIcon } from '../../assets/images/Boxing.svg';
import { ReactComponent as TennisIcon } from '../../assets/images/Tennis.svg';
import { ReactComponent as CyclingIcon } from '../../assets/images/Cycle.svg';
import { ReactComponent as GolfIcon } from '../../assets/images/Golf.svg';
import { ReactComponent as SwimmingIcon } from '../../assets/images/Swimming.svg';
import { ReactComponent as RunningIcon } from '../../assets/images/Running.svg';
import { ReactComponent as PilatesIcon } from '../../assets/images/Pilates.svg';
import { ReactComponent as HikingIcon } from '../../assets/images/Hiking.svg';
import { ReactComponent as CrossFitIcon } from '../../assets/images/CrossFit.svg';
import { ReactComponent as TableTennisIcon } from '../../assets/images/TableTennis.svg';
import { ReactComponent as YogaIcon } from '../../assets/images/Yoga.svg';
import { ReactComponent as PostImg } from '../../assets/images/PostImg.svg';
import { ReactComponent as PostNoImg } from '../../assets/images/PostNoImg.svg';
import { ReactComponent as NextIcon } from '../../assets/images/Next.svg';
import { ReactComponent as DefaultProfile } from '../../assets/images/DefaultProfile.svg';
import { ReactComponent as GreenCheckIcon } from '../../assets/images/GreenCheckIcon.svg';

const sportsList = [
  { name: '축구', englishName: 'Soccer' },
  { name: '야구', englishName: 'Baseball' },
  { name: '농구', englishName: 'Basketball' },
  { name: '볼링', englishName: 'Bowling' },
  { name: '배드민턴', englishName: 'Badminton' },
  { name: '클라이밍', englishName: 'Climbing' },
  { name: '복싱', englishName: 'Boxing' },
  { name: '테니스', englishName: 'Tennis' },
  { name: '사이클', englishName: 'Cycling' },
  { name: '골프', englishName: 'Golf' },
  { name: '수영', englishName: 'Swimming' },
  { name: '런닝', englishName: 'Running' },
  { name: '필라테스', englishName: 'Pilates' },
  { name: '등산', englishName: 'Hiking' },
  { name: '크로스핏', englishName: 'CrossFit' },
  { name: '탁구', englishName: 'TableTennis' },
  { name: '요가', englishName: 'Yoga' },
];

const sportIcons = {
  Soccer: SoccerIcon,
  Baseball: BaseballIcon,
  Basketball: BasketballIcon,
  Badminton: BadmintonIcon,
  Bowling: BowlingIcon,
  Climbing: ClimbingIcon,
  Boxing: BoxingIcon,
  Tennis: TennisIcon,
  Cycling: CyclingIcon,
  Golf: GolfIcon,
  Swimming: SwimmingIcon,
  Running: RunningIcon,
  Pilates: PilatesIcon,
  Hiking: HikingIcon,
  CrossFit: CrossFitIcon,
  TableTennis: TableTennisIcon,
  Yoga: YogaIcon,
};

const sportName = '축구';
const userName = '도라산너구리';

const renderSportIcon = (sport) => {
  const englishName = sportsList.find((s) => s.name === sport)?.englishName;
  const SvgComponent = sportIcons[englishName];
  return SvgComponent ? (
    <SvgComponent className="mypage-profile-info-sport-icon" />
  ) : null;
};

const Tags = ({ tagList, selectedTag, handleTagClick, getTagCount }) => {
  return (
    <div>
      <ul className="tag-container">
        {tagList.map((tag) => (
          <li
            key={tag}
            className={selectedTag === tag ? 'tag-list-selected' : 'tag-list'}
            onClick={() => handleTagClick(tag)}
          >
            {tag} ({getTagCount(tag)})
          </li>
        ))}
      </ul>
    </div>
  );
};

//페이지네이션
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const currentGroup = Math.floor((currentPage - 1) / maxPagesToShow);
  const startPage = currentGroup * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleNextGroup = () => {
    const nextGroupFirstPage = startPage + maxPagesToShow;
    if (nextGroupFirstPage <= totalPages) {
      onPageChange(nextGroupFirstPage);
    }
  };

  const handlePrevGroup = () => {
    const prevGroupFirstPage = startPage - maxPagesToShow;
    if (prevGroupFirstPage > 0) {
      onPageChange(prevGroupFirstPage);
    }
  };

  return (
    <div className="mypage-pagination-container">
      <div className="board-pagination-box">
        {startPage > 1 && (
          <div
            className="board-pagination-previcon-box"
            onClick={handlePrevGroup}
          >
            <NextIcon className="board-pagination-previcon" />
          </div>
        )}
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? 'board-pagination-selectedpage'
                : 'board-pagination-page'
            }
          >
            {page}
          </div>
        ))}
        {endPage < totalPages && (
          <div
            className="board-pagination-nexticon-box"
            onClick={handleNextGroup}
          >
            <NextIcon className="board-pagination-nexticon" />
          </div>
        )}
      </div>
    </div>
  );
};

//날짜폼
const timeForm = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//소모임 수락 모달
const RequestModal = ({
  toggleRequestModal,
  nickname,
  title,
  info,
  gender,
  age,
  onConfirm,
}) => {
  const handleRequestAllow = () => {
    const isConfirmed = window.confirm(
      '소모임 신청을 수락하시겠습니까?\n' +
      nickname +
      ' 님에게 소모임 참가용 오픈채팅방 주소가 전달됩니다.'
    );

    if (isConfirmed) {
      alert(nickname + ' 의 소모임 신청을 수락하였습니다.');
      onConfirm();
      toggleRequestModal();
    }
  };

  const handleRequestDeny = () => {
    const isConfirmed = window.confirm(
      '소모임 신청을 거절하시겠습니까?\n' +
      nickname +
      '의 재신청 및 참가 불가합니다.'
    );
    if (isConfirmed) {
      alert(nickname + ' 의 소모임 신청이 거절되었습니다.');
      onConfirm();
      toggleRequestModal();
    }
  };

  return (
    <div className="request-modal-back" onClick={toggleRequestModal}>
      <div className="modal-request" onClick={(e) => e.stopPropagation()}>
        <div className="request-head">
          <h1>소모임 수락</h1>
          <button onClick={toggleRequestModal}>&#x2715;</button>
        </div>
        <div className="request-nickname">
          <p>신청자</p> {nickname} ({gender},{age})
        </div>
        <div className="request-content">
          <p>소모임</p>
          <div className="request-content-in">{title}</div>
        </div>
        <div className="request-reason">
          <p>자기 소개</p>
          <div className="request-info">{info}</div>
        </div>
        <div className="request-btn">
          <button className="request-allow" onClick={handleRequestAllow}>
            수락하기
          </button>
          <button className="request-deny" onClick={handleRequestDeny}>
            거절하기
          </button>
        </div>
      </div>
    </div>
  );
};

// 액티비티 목업 데이터 생성 함수
const generateMockPosts = (numPosts) => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomArrayElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const generateRandomDate = () => {
    const start = new Date();
    const end = new Date();
    end.setFullYear(start.getFullYear() - 1);
    return new Date(
      start.getTime() - Math.random() * (start.getTime() - end.getTime())
    ).toISOString();
  };

  const isImg = [true, false];

  const sports = [
    '축구',
    '야구',
    '농구',
    '볼링',
    '배드민턴',
    '클라이밍',
    '복싱',
    '테니스',
    '사이클',
    '골프',
    '수영',
    '런닝',
    '필라테스',
    '등산',
    '크로스핏',
    '탁구',
    '요가',
  ];
  const activities = ['작성글', '댓글', '참여한 소모임', '좋아요한 글'];

  const boards = ['정보', '자유', '후기', '문의/신고'];

  const posts = [];

  const locations = [
    '전체',
    '서울',
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
    '부산',
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
    '대구',
    '남구',
    '달서구',
    '달성군',
    '동구',
    '북구',
    '서구',
    '수성구',
    '중구',
    '인천',
    '강화군',
    '계양구',
    '미추홀구',
    '남동구',
    '동구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구',
    '광주',
    '광산구',
    '남구',
    '동구',
    '북구',
    '서구',
    '대전',
    '동구',
    '서구',
    '유성구',
    '중구',
    '울산',
    '남구',
    '동구',
    '북구',
    '울주군',
    '중구',
    '세종시',
    '경기도',
    '가평군',
    '고양시',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '수원시',
    '시흥시',
    '안산시',
    '안성시',
    '안양시',
    '양주시',
    '양평군',
    '여주시',
    '연천군',
    '오산시',
    '용인시',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시',
    '강원도',
    '강릉시',
    '고성군',
    '동해시',
    '삼척시',
    '속초시',
    '양구군',
    '양양군',
    '영월군',
    '원주시',
    '인제군',
    '정선군',
    '철원군',
    '춘천시',
    '태백시',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군',
    '충청북도',
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '제천시',
    '증평군',
    '진천군',
    '청주시',
    '충주시',
    '충청남도',
    '계룡시',
    '공주시',
    '금산군',
    '논산시',
    '당진시',
    '보령시',
    '부여군',
    '서산시',
    '서천군',
    '아산시',
    '예산군',
    '천안시',
    '청양군',
    '태안군',
    '홍성군',
    '전라북도',
    '고창군',
    '군산시',
    '김제시',
    '남원시',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '익산시',
    '임실군',
    '장수군',
    '전주시',
    '정읍시',
    '진안군',
    '전라남도',
    '강진군',
    '고흥군',
    '곡성군',
    '광양시',
    '구례군',
    '나주시',
    '담양군',
    '목포시',
    '무안군',
    '보성군',
    '순천시',
    '신안군',
    '여수시',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군',
    '경상북도',
    '경산시',
    '경주시',
    '고령군',
    '구미시',
    '군위군',
    '김천시',
    '문경시',
    '봉화군',
    '상주시',
    '성주군',
    '안동시',
    '영덕군',
    '영양군',
    '영주시',
    '영천시',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
    '포항시',
    '경상남도',
    '거제시',
    '거창군',
    '고성군',
    '김해시',
    '남해군',
    '밀양시',
    '사천시',
    '산청군',
    '양산시',
    '의령군',
    '진주시',
    '창녕군',
    '창원시',
    '통영시',
    '하동군',
    '함안군',
    '함양군',
    '합천군',
    '제주도',
    '서귀포시',
    '제주시',
  ];

  for (let i = 0; i < numPosts; i++) {
    posts.push({
      id: `${i + 1}`,
      nickname: `작성자 ${i + 1}`,
      locationType: getRandomArrayElement(locations),
      sportType: getRandomArrayElement(sports),
      boardType: getRandomArrayElement(boards),
      activityType: getRandomArrayElement(activities),
      imgType: getRandomArrayElement(isImg),
      title: `제목 ${i + 1}`,
      comments: getRandomInt(0, 50),
      date: generateRandomDate(),
      createdAt: generateRandomDate(),
      comment: `댓글내용입니다 ${i + 1}`,
    });
  }

  return posts;
};

//팔로워/팔로잉 목업 데이터
const generateMockFollows = (numFollows) => {
  const follows = [];
  const sports = [
    '축구',
    '야구',
    '농구',
    '볼링',
    '배드민턴',
    '클라이밍',
    '복싱',
    '테니스',
    '사이클',
    '골프',
    '수영',
    '런닝',
    '필라테스',
    '등산',
    '크로스핏',
    '탁구',
    '요가',
  ];

  for (let i = 0; i < numFollows; i++) {
    follows.push({
      id: i + 1,
      profileImage: null, // 프로필 이미지가 없는 경우
      nickname: `팔로워 ${i + 1}`,
      sport: sports[i % sports.length],
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 1000),
    });
  }

  return follows;
};

//알림 목업 데이터
const generateMockNotifications = (numNotifications) => {
  const notifications = [];
  const sports = [
    '축구',
    '야구',
    '농구',
    '볼링',
    '배드민턴',
    '클라이밍',
    '복싱',
    '테니스',
    '사이클',
    '골프',
    '수영',
    '런닝',
    '필라테스',
    '등산',
    '크로스핏',
    '탁구',
    '요가',
  ];
  const boards = ['자유', '후기', '정보'];
  const notificationTypes = ['댓글', '소모임신청', '소모임수락', '소모임마감'];
  const names = ['홍길동', '김철수', '이영희', '박영수'];
  const genders = ['남', '여'];
  const isCloseEarly = [true, false];

  for (let i = 0; i < numNotifications; i++) {
    const type =
      notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const notification = {
      id: i + 1,
      nickname: names[Math.floor(Math.random() * names.length)],
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: Math.floor(Math.random() * 60) + 20, // 20에서 80 사이의 나이
      sport: sports[Math.floor(Math.random() * sports.length)],
      board: boards[Math.floor(Math.random() * boards.length)],
      close: isCloseEarly[Math.floor(Math.random() * isCloseEarly.length)],
      notificationType: type,
      postTitle: `게시글 제목 ${i + 1}`,
      notificationDate: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      isRead: Math.random() < 0.5,
    };

    if (type === '댓글') {
      notification.commentContent = `댓글 내용 ${i + 1}`;
    } else if (type === '소모임신청') {
      notification.info = `자기소개 내용 ${i + 1}`;
    }

    notifications.push(notification);
  }

  return notifications;
};

const Posts = ({ posts, currentPage, postsPerPage, onPageChange }) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const nav = useNavigate();

  const sportTypeMapping = {
    '축구': 'soccer',
    '농구': 'basketball',
    '야구': 'baseball',
    '볼링': 'bowling',
    '배드민턴': 'badminton',
    '클라이밍': 'climbing',
    '복싱': 'boxing',
    '테니스': 'tennis',
    '사이클': 'cycling',
    '골프': 'golf',
    '수영': 'swimming',
    '런닝': 'running',
    '필라테스': 'pilates',
    '등산': 'hiking',
    '크로스핏': 'crossfit',
    '탁구': 'tabletennis',
    '요가': 'yoga',
  };

  const boardTypeMapping = {
    '자유': 'free',
    '후기': 'review',
    '정보': 'info',
  }


  if (posts.length === 0) {
    return (
      <div className="contents-no-post-list-container">
        <p>작성한 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="contents-post-container">
        {currentPosts.map((post) => {
          const translatedSportType = sportTypeMapping[post.sportType];
          const translatedBoardType = boardTypeMapping[post.boardType];
          return (
            <div key={post.id} className="contents-post-list-container">
              <div className="contents-post-details">
                {post.imgType === true ? (
                  <PostImg className="contents-post-icon" />
                ) : (
                  <PostNoImg className="contents-post-icon" />
                )}

                <div
                  className="contents-post-box"
                  onClick={() => {
                    if (post.boardType === '문의/신고') {
                      nav(`/inquiry/${post.id}`);
                    } else {
                      nav(`/post/${translatedBoardType}/${translatedSportType}/${post.id}`);
                    }
                  }}
                >
                  {post.boardType === '문의/신고' ? (
                    ''
                  ) : (
                    <div className="contents-post-sport">[{post.sportType}]</div>
                  )}

                  <div className="contents-post-board">[{post.boardType}]</div>
                  <div className="contents-post-title">{post.title}</div>
                </div>
                {post.comments > 0 && (
                  <div className="contents-post-comments-count">
                    {post.comments}
                  </div>
                )}
              </div>
              <div className="contents-post-info">
                <div className="contents-post-time">
                  {timeForm(post.createdAt)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

const Comments = ({ comments, currentPage, postsPerPage, onPageChange }) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(comments.length / postsPerPage);
  const nav = useNavigate();

  const sportTypeMapping = {
    '축구': 'soccer',
    '농구': 'basketball',
    '야구': 'baseball',
    '볼링': 'bowling',
    '배드민턴': 'badminton',
    '클라이밍': 'climbing',
    '복싱': 'boxing',
    '테니스': 'tennis',
    '사이클': 'cycling',
    '골프': 'golf',
    '수영': 'swimming',
    '런닝': 'running',
    '필라테스': 'pilates',
    '등산': 'hiking',
    '크로스핏': 'crossfit',
    '탁구': 'tabletennis',
    '요가': 'yoga',
  };

  const boardTypeMapping = {
    '자유': 'free',
    '후기': 'review',
    '정보': 'info',
  }


  if (comments.length === 0) {
    return (
      <div className="contents-no-comment-list-container">
        <p>작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="contents-comment-container">
        {currentComments.map((comment) => {
          const translatedSportType = sportTypeMapping[comment.sportType];
          const translatedBoardType = boardTypeMapping[comment.boardType];
          return (
            <div key={comment.id} className="contents-comment-list-container">
              <div className="contents-comment-list-container-1" onClick={() => { nav(`/post/${translatedBoardType}/${translatedSportType}/${comment.id}`) }} >
                <div className="contents-comment">{comment.comment}</div>
                <div className="contents-comment-post">
                  <div className="contents-comment-post-sport">
                    [{comment.sportType}]
                  </div>
                  <div className="contents-comment-post-board">
                    [{comment.boardType}]
                  </div>
                  <div className="contents-comment-post-title">
                    {comment.title}
                  </div>
                </div>
              </div>
              <div className="contents-comment-list-container-2">
                {timeForm(comment.createdAt)}
              </div>
            </div>
          )
        })}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

const ParticipatedClub = ({
  posts,
  currentPage,
  postsPerPage,
  onPageChange,
}) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const nav = useNavigate();

  const sportTypeMapping = {
    '축구': 'soccer',
    '농구': 'basketball',
    '야구': 'baseball',
    '볼링': 'bowling',
    '배드민턴': 'badminton',
    '클라이밍': 'climbing',
    '복싱': 'boxing',
    '테니스': 'tennis',
    '사이클': 'cycling',
    '골프': 'golf',
    '수영': 'swimming',
    '런닝': 'running',
    '필라테스': 'pilates',
    '등산': 'hiking',
    '크로스핏': 'crossfit',
    '탁구': 'tabletennis',
    '요가': 'yoga',
  };

  if (posts.length === 0) {
    return (
      <div className="contents-no-club-list-container">
        <div className="contents-club-head">
          <div className="contents-club-head-1">제목</div>
          <div className="contents-club-head-2">장소</div>
          <div className="contents-club-head-3">소모임장</div>
          <div className="contents-club-head-4">참여날짜</div>
        </div>
        <p>참여한 소모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="contents-post-container">
        <div className="contents-club-head">
          <div className="contents-club-head-1">제목</div>
          <div className="contents-club-head-2">장소</div>
          <div className="contents-club-head-3">소모임장</div>
          <div className="contents-club-head-4">참여날짜</div>
        </div>
        {currentPosts.map((post) => {
          const translatedSportType = sportTypeMapping[post.sportType];
          return (
            <div key={post.id} className="contents-club-list-container">
              <div className="contents-club-details">
                <div
                  className="contents-club-box"
                  onClick={() => {
                    nav(`/clubpost/${translatedSportType}/${post.id}`)
                  }}
                >
                  {post.imgType === true ? (
                    <PostImg className="contents-post-icon" />
                  ) : (
                    <PostNoImg className="contents-post-icon" />
                  )}
                  <div className="contents-club-sport">[{post.sportType}]</div>
                  <div className="contents-club-title">{post.title}</div>
                </div>
              </div>

              <div className="contents-club-location">{post.locationType}</div>
              <div className="contents-club-leader">{post.nickname}</div>
              <div className="contents-club-time">{timeForm(post.date)}</div>
            </div>
          )
        })}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

const LikedPosts = ({ posts, currentPage, postsPerPage, onPageChange }) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const nav = useNavigate();

  const sportTypeMapping = {
    '축구': 'soccer',
    '농구': 'basketball',
    '야구': 'baseball',
    '볼링': 'bowling',
    '배드민턴': 'badminton',
    '클라이밍': 'climbing',
    '복싱': 'boxing',
    '테니스': 'tennis',
    '사이클': 'cycling',
    '골프': 'golf',
    '수영': 'swimming',
    '런닝': 'running',
    '필라테스': 'pilates',
    '등산': 'hiking',
    '크로스핏': 'crossfit',
    '탁구': 'tabletennis',
    '요가': 'yoga',
  };

  const boardTypeMapping = {
    '자유': 'free',
    '후기': 'review',
    '정보': 'info',
  }

  if (posts.length === 0) {
    return (
      <div className="contents-no-post-list-container">
        <p>좋아요 한 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="contents-post-container">
        {currentPosts.map((post) => {
          const translatedSportType = sportTypeMapping[post.sportType];
          const translatedBoardType = boardTypeMapping[post.boardType];
          return (
            <div key={post.id} className="contents-post-list-container">
              <div className="contents-post-details">
                {post.imgType === true ? (
                  <PostImg className="contents-post-icon" />
                ) : (
                  <PostNoImg className="contents-post-icon" />
                )}

                <div
                  className="contents-post-box"
                  onClick={() => {
                    nav(`/post/${translatedBoardType}/${translatedSportType}/${post.id}`)
                  }}
                >

                  <div className="contents-post-sport">[{post.sportType}]</div>
                  <div className="contents-post-board">[{post.boardType}]</div>
                  <div className="contents-post-title">{post.title}</div>
                </div>
                {post.comments > 0 && (
                  <div className="contents-post-comments-count">
                    {post.comments}
                  </div>
                )}
              </div>
              <div className="contents-post-info">
                <div className="contents-post-writer">{post.nickname}</div>·
                <div className="contents-post-time">
                  {timeForm(post.createdAt)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

const Activity = () => {
  const activityTags = ['작성글', '댓글', '참여한 소모임', '좋아요한 글'];
  const [selectedTag, setSelectedTag] = useState(activityTags[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const posts = generateMockPosts(100); // 목업 데이터 생성

  const getTagCount = (tag) => {
    return posts.filter((post) => post.activityType === tag).length;
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // 태그 변경 시 첫 페이지로 초기화
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    const filteredPosts = posts.filter(
      (post) => post.activityType === selectedTag
    );

    switch (selectedTag) {
      case '작성글':
        return (
          <Posts
            posts={filteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
          />
        );
      case '댓글':
        return (
          <Comments
            comments={filteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
          />
        );
      case '참여한 소모임':
        return (
          <ParticipatedClub
            posts={filteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
          />
        );
      case '좋아요한 글':
        return (
          <LikedPosts
            posts={filteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Tags
        tagList={activityTags}
        selectedTag={selectedTag}
        handleTagClick={handleTagClick}
        getTagCount={getTagCount}
      />
      {renderContent()}
    </div>
  );
};

const Following = ({ userName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const followsPerPage = 10;
  const follows = generateMockFollows(20); // 목업 데이터 생성

  const startIndex = (currentPage - 1) * followsPerPage;
  const endIndex = startIndex + followsPerPage;
  const currentFollows = follows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(follows.length / followsPerPage);
  const nav = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (follows.length === 0) {
    return (
      <div className="no-followers">
        <div className="following-head">
          <span>{userName}</span>
          <div>님을 팔로우 중인 멤버</div>
        </div>
        <p> 팔로우 중인 유저가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="Following">
      <div className="following-head">
        <span>{userName}</span>
        <div>님을 팔로우 중인 멤버</div>
      </div>
      <div className="following-list">
        {currentFollows.map((follow) => (
          <div key={follow.id} className="following-item" onClick={() => { nav(`/mypage/${follow.nickname}`) }}>
            <div className="following-item-profile">
              {follow.profileImage ? (
                <img src={follow.profileImage} alt={follow.nickname} />
              ) : (
                <ProfileImage />
              )}
            </div>
            <div className="following-item-info">
              <div className="following-item-nickname">{follow.nickname}</div>
              <div className="following-item-sport">
                <div className="following-item-sport-svg">
                  {renderSportIcon(follow.sport)}
                </div>
                {follow.sport}
              </div>
              <div className="following-item-stats">
                <div className="following-item-stats-1">
                  팔로워 <span>{follow.followers}</span>
                </div>
                <div className="following-item-stats-1">
                  팔로잉 <span>{follow.following}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

const Follower = ({ userName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const followsPerPage = 10;
  const follows = generateMockFollows(50); // 목업 데이터 생성

  const startIndex = (currentPage - 1) * followsPerPage;
  const endIndex = startIndex + followsPerPage;
  const currentFollows = follows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(follows.length / followsPerPage);
  const nav = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (follows.length === 0) {
    return (
      <div className="no-followers">
        <div className="following-head">
          <span>{userName}</span>
          <div>님이 팔로우 중인 멤버</div>
        </div>
        <p>팔로우 중인 유저가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="Following">
      <div className="following-head">
        <span>{userName}</span>
        <div>님이 팔로우 중인 멤버</div>
      </div>
      <div className="following-list">
        {currentFollows.map((follow) => (
          <div key={follow.id} className="following-item" onClick={() => { nav(`/mypage/${follow.nickname}`) }}>
            <div className="following-item-profile">
              {follow.profileImage ? (
                <img src={follow.profileImage} alt={follow.nickname} />
              ) : (
                <ProfileImage />
              )}
            </div>
            <div className="following-item-info">
              <div className="following-item-nickname">{follow.nickname}</div>
              <div className="following-item-sport">
                <div className="following-item-sport-svg">
                  {renderSportIcon(follow.sport)}
                </div>
                {follow.sport}
              </div>
              <div className="following-item-stats">
                <div className="following-item-stats-1">
                  팔로워 <span>{follow.followers}</span>
                </div>
                <div className="following-item-stats-1">
                  팔로잉 <span>{follow.following}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

const Notification = () => {
  const [notifications, setNotifications] = useState(
    generateMockNotifications(30)
  );
  const [selectedTag, setSelectedTag] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const nav = useNavigate();

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAsProcessed = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isProcessed: true, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTag === '전체') return true;
    if (selectedTag === '읽음') return notification.isRead;
    if (selectedTag === '안읽음') return !notification.isRead;
    return true;
  });

  const sortedNotifications = filteredNotifications.sort(
    (a, b) => new Date(b.notificationDate) - new Date(a.notificationDate)
  );

  const totalPages = Math.ceil(
    sortedNotifications.length / notificationsPerPage
  );
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  const currentNotifications = sortedNotifications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sportTypeMapping = {
    '축구': 'soccer',
    '농구': 'basketball',
    '야구': 'baseball',
    '볼링': 'bowling',
    '배드민턴': 'badminton',
    '클라이밍': 'climbing',
    '복싱': 'boxing',
    '테니스': 'tennis',
    '사이클': 'cycling',
    '골프': 'golf',
    '수영': 'swimming',
    '런닝': 'running',
    '필라테스': 'pilates',
    '등산': 'hiking',
    '크로스핏': 'crossfit',
    '탁구': 'tabletennis',
    '요가': 'yoga',
  };

  const boardTypeMapping = {
    '자유': 'free',
    '후기': 'review',
    '정보': 'info',
  }

  console.log(notifications); // 디버깅: notification 객체의 값을 출력하여 확인


  return (
    <div>
      <Tags
        tagList={['전체', '읽음', '안읽음']}
        selectedTag={selectedTag}
        handleTagClick={handleTagClick}
        getTagCount={(tag) =>
          notifications.filter((notification) => {
            if (tag === '전체') return true;
            if (tag === '읽음') return notification.isRead;
            if (tag === '안읽음') return !notification.isRead;
            return true;
          }).length
        }
      />
      {currentNotifications.length === 0 ? (
        <div className="no-notifications">알림이 없습니다</div>
      ) : (
        currentNotifications.map((notification) => {
          const translatedSportType = sportTypeMapping[notification.sport];
          const translatedBoardType = boardTypeMapping[notification.board];
          return (
            <div
              key={notification.id}
              className={`notification-item ${notification.isRead ? 'read' : 'unread'
                }`}
            >
              <div className="notification-content">
                {notification.notificationType === '댓글' && (
                  <div onClick={() => { nav(`/post/${translatedBoardType}/${translatedSportType}/${notification.id}`) }}>
                    <div className="notification-content-head">
                      <div className="notification-content-title">
                        <span>{notification.nickname}</span> 님이 게시글에 댓글을
                        작성했습니다
                      </div>
                      <div className="notification-content-date">
                        {timeForm(notification.notificationDate)}
                      </div>
                    </div>
                    <div className="notification-contents">
                      {notification.commentContent}
                    </div>
                    <div className="notification-content-3">
                      <div className="notification-content-src">
                        <span>
                          [{notification.sport}][{notification.board}]
                        </span>
                        {notification.postTitle}
                      </div>
                      <div className="notification-actions">
                        {!notification.isRead && (
                          <button onClick={() => markAsRead(notification.id)}>
                            읽음
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {notification.notificationType === '소모임신청' && (
                  <div>
                    <div className="notification-content-head">
                      <div className="notification-content-title">
                        <span>{notification.nickname}</span> 님이 소모임 신청을
                        보냈습니다
                      </div>
                      <div className="notification-content-date">
                        {timeForm(notification.notificationDate)}
                      </div>
                    </div>
                    <div
                      className={`notification-contents ${notification.isProcessed ? 'disabled' : ''
                        }`}
                      onClick={() => {
                        if (!notification.isProcessed) {
                          markAsRead(notification.id);
                          openModal(notification);
                        }
                      }}
                    >
                      <span>[클릭]</span> 자기소개 보러 가기
                    </div>
                    <div className="notification-content-3">
                      <div className="notification-content-src" onClick={() => { nav(`/clubpost/${translatedSportType}/${notification.id}`) }}>
                        <span>[{notification.sport}]</span>{' '}
                        {notification.postTitle}
                      </div>
                      <div className="notification-actions">
                        {!notification.isRead && (
                          <button onClick={() => markAsRead(notification.id)}>
                            읽음
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {notification.notificationType === '소모임수락' && (
                  <div>
                    <div className="notification-content-head">
                      <div className="notification-content-title">
                        <span>{notification.nickname}</span> 님이 소모임 신청을
                        수락했습니다
                      </div>
                      <div className="notification-content-date">
                        {timeForm(notification.notificationDate)}
                      </div>
                    </div>
                    <div className="notification-contents">
                      <span>[클릭]</span> 오픈 채팅방 참여하러 가기
                    </div>
                    <div className="notification-content-3">
                      <div className="notification-content-src" onClick={() => { nav(`/clubpost/${translatedSportType}/${notification.id}`) }}>
                        <span>[{notification.sport}]</span>{' '}
                        {notification.postTitle}
                      </div>
                      <div className="notification-actions">
                        {!notification.isRead && (
                          <button onClick={() => markAsRead(notification.id)}>
                            읽음
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {notification.notificationType === '소모임마감' && (
                  <div onClick={() => { nav(`/clubpost/${translatedSportType}/${notification.id}`) }}>
                    <div className="notification-content-head">
                      <div className="notification-content-title">
                        <div>소모임이 마감되었습니다.</div>
                      </div>
                      <div className="notification-content-date">
                        {timeForm(notification.notificationDate)}
                      </div>
                    </div>
                    <div className="notification-contents">
                      {notification.close
                        ? `${notification.nickname}님이 소모임을 마감했습니다.`
                        : '마감 예정일이 지나 소모임이 마감되었습니다.'
                      }
                    </div>
                    <div className="notification-content-3">
                      <div className="notification-content-src">
                        <span>[{notification.sport}]</span>{' '}
                        {notification.postTitle}
                      </div>
                      <div className="notification-actions">
                        {!notification.isRead && (
                          <button onClick={() => markAsRead(notification.id)}>
                            읽음
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {isModalOpen && modalContent && (
        <RequestModal
          toggleRequestModal={closeModal}
          nickname={modalContent.nickname}
          title={modalContent.postTitle}
          info={modalContent.commentContent || modalContent.info}
          gender={modalContent.gender}
          age={modalContent.age}
          onConfirm={() => markAsProcessed(modalContent.id)}
        />
      )}
    </div>
  );
};

const MyPage = () => {
  const nav = useNavigate();
  const { username } = useParams();
  const [selectedActivity, setSelectedActivity] = useState('활동 내역');
  const [mockUser, setMockUser] = useState({
    id: 1,
    profileImage: <ProfileImage />,
    nickname: username,
    sport: ['축구', '농구', '야구'],
    follower: 35,
    following: 27,
    club: 5,
  });

  const [isFollow, setIsFollow] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef.current === null) {
      console.error('fileInputRef is null');
    }
  }, [fileInputRef]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMockUser((prevUser) => ({
        ...prevUser,
        profileImage: <img src={reader.result} alt="Profile" />,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleFollowing = () => {
    setIsFollow(!isFollow);
  };

  const toggleModifying = () => {
    setIsModified(!isModified);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  const [isFocused, setIsFocused] = useState(false);
  const [isUnique, setIsUnique] = useState(true);
  const [showError, setShowError] = useState(false);
  const [inputClass, setInputClass] = useState('');
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [selectedButtons, setSelectedButtons] = useState(mockUser.sport);

  const sports = [
    '축구',
    '야구',
    '농구',
    '볼링',
    '배드민턴',
    '클라이밍',
    '복싱',
    '테니스',
    '사이클',
    '골프',
    '수영',
    '런닝',
    '발레',
    '필라테스',
    '등산',
    '크로스핏',
    '탁구',
    '요가',
  ];

  useEffect(() => {
    setNickname(mockUser.nickname);
    setSelectedButtons(mockUser.sport);
  }, [mockUser]);

  // 이미 존재하는 닉네임 예시
  const existingNicknames = ['user1', 'user2', 'user3'];

  const validateNickname = (name) => {
    if (!/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,12}$/.test(name)) {
      alert('한글, 영어, 숫자포함 3자~12자 가능합니다');
      setInputClass('error');
      return false;
    }
    setInputClass('');
    return true;
  };

  const checkNicknameUnique = (name) => {
    if (existingNicknames.includes(name)) {
      setIsUnique(false);
      setInputClass('error');
      return false;
    }
    setIsUnique(true);
    setInputClass('success');
    return true;
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
    setInputClass(''); // 입력 변경시 클래스 초기화
    setShowError(false); // 에러 메시지 초기화
  };

  const handleCheckNickname = () => {
    setShowError(true);
    if (validateNickname(nickname)) {
      checkNicknameUnique(nickname);
    } else {
      // 불가능한 닉네임일경우, 중복검사실행안함
      setIsUnique(true);
    }
  };

  const handleBtnClick = (button) => {
    setSelectedButtons((prevSelected) => {
      if (prevSelected.includes(button)) {
        return prevSelected.filter((item) => item !== button);
      } else {
        if (prevSelected.length < 5) {
          return [...prevSelected, button];
        } else {
          alert('최대 5개까지 선택 가능합니다.');
          return prevSelected;
        }
      }
    });
  };

  const getBadgeNumber = (button) => {
    return selectedButtons.indexOf(button) + 1;
  };

  //설정완료 중복확인여부체크
  const handleComplete = () => {
    if (inputClass !== 'success') {
      alert('중복확인을 완료해야 합니다');
      return;
    }
    setMockUser((prevUser) => ({
      ...prevUser,
      nickname: nickname,
      sport: selectedButtons,
    }));
    toggleModifying();
    nav(`/mypage/${nickname}`);
  };

  if (isModified === true) {
    return (
      <div className="mypage-container">
        <div className="mypage-title">마이페이지</div>
        <div className="mypage-modified-profile-container-wrap">
          <div className="mypage-modified-profile-container">
            <div>
              <div className="mypage-profile-image-wrap">
                {mockUser.profileImage === null ? (
                  <DefaultProfile className="mypage-profile-image" />
                ) : (
                  mockUser.profileImage
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
              <button
                className="my-page-modify-btn-profile-img"
                onClick={handleButtonClick}
              >
                프로필 이미지 수정
              </button>
            </div>
            <div className="mypage-profile-info-container">
              <div className="mypage-profile-info-namebox">
                <div className="mypage-profile-info-name">
                  {mockUser.nickname}
                </div>
              </div>
              <div className="mypage-profile-info-sportsbox">
                {renderSportIcon(sportName)}
                <div className="mypage-profile-info-sport-name">
                  {sportName}
                </div>
              </div>
              <div className="mypage-profile-info-activitybox">
                <div className="mypage-profile-info-activity-followingbox">
                  <div className="mypage-profile-info-activity-following">
                    팔로잉
                  </div>
                  <div className="mypage-profile-info-activity-followingnumber">
                    {mockUser.following}
                  </div>
                  <div></div>
                </div>
                <div className="mypage-profile-info-activity-followerbox">
                  <div className="mypage-profile-info-activity-follower">
                    팔로워
                  </div>
                  <div className="mypage-profile-info-activity-followernumber">
                    {mockUser.follower}
                  </div>
                </div>
                <div className="mypage-profile-info-activity-clubbox">
                  <div className="mypage-profile-info-activity-club">
                    참여한 소모임 수
                  </div>
                  <div className="mypage-profile-info-activity-clubnumber">
                    {mockUser.club}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-page-modified-setting">
          <div className="my-page-modified-nickWrap">
            <h2 className="my-page-modified-nickSet">닉네임 설정</h2>
            <div className="my-page-modified-inputWrap">
              <input
                placeholder="닉네임은 영어, 숫자포함 3자에서 12자까지 설정할 수 있어요"
                type="text"
                value={nickname}
                onChange={handleChange}
                className={`${inputClass} ${isFocused ? 'focused' : ''}`}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
              />
              <button className="redund" onClick={handleCheckNickname}>
                중복확인
              </button>
            </div>
            {showError && !isUnique && (
              <div className="message">이미 존재하는 닉네임입니다</div>
            )}
            {showError && isUnique && inputClass === 'success' && (
              <div className="successMessage">사용가능한 닉네임입니다</div>
            )}
          </div>
          <div className="my-page-modified-pickSports">
            <h2 className="my-page-modified-sportsSet">선호 종목 선택</h2>
            <h4 className="my-page-modified-sportsSetInfo">
              최대 5개까지 설정 가능합니다. 추후에 변경 가능합니다.
            </h4>
            <div className="btnContainer">
              {sports.map((button) => (
                <div key={button} className="buttonWrap">
                  <button
                    className={`sportsButton ${selectedButtons.includes(button)
                      ? 'selectedSportsButton'
                      : ''
                      }`}
                    onClick={() => handleBtnClick(button)}
                  >
                    {button}
                  </button>
                  {selectedButtons.includes(button) && (
                    <span className="badge">{getBadgeNumber(button)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap">
          <button
            className="my-page-modified-Complete"
            onClick={handleComplete}
          >
            설정완료
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="mypage-title">마이페이지</div>
      <div className="mypage-profile-container">
        <div className="mypage-profile-image-wrap">
          {mockUser.profileImage === null ? (
            <DefaultProfile className="mypage-profile-image" />
          ) : (
            mockUser.profileImage
          )}
        </div>
        <div className="mypage-profile-info-container">
          <div className="mypage-profile-info-namebox">
            <div className="mypage-profile-info-name">{mockUser.nickname}</div>
            <div>
              {mockUser.nickname === userName ? (
                <button
                  className="mypage-profile-info-edit"
                  onClick={toggleModifying}
                >
                  회원정보 수정
                </button>
              ) : (
                <button
                  className="mypage-profile-info-edit"
                  onClick={toggleFollowing}
                >
                  팔로우 {isFollow ? <GreenCheckIcon /> : ' +'}
                </button>
              )}
            </div>
          </div>
          <div className="mypage-profile-info-sportsbox">
            {renderSportIcon(mockUser.sport[0])}
            <div className="mypage-profile-info-sport-name">
              {mockUser.sport[0]}
            </div>
          </div>
          <div className="mypage-profile-info-activitybox">
            <div className="mypage-profile-info-activity-followingbox">
              <div className="mypage-profile-info-activity-following">
                팔로잉
              </div>
              <div className="mypage-profile-info-activity-followingnumber">
                {mockUser.following}
              </div>
              <div></div>
            </div>
            <div className="mypage-profile-info-activity-followerbox">
              <div className="mypage-profile-info-activity-follower">
                팔로워
              </div>
              <div className="mypage-profile-info-activity-followernumber">
                {mockUser.follower}
              </div>
            </div>
            <div className="mypage-profile-info-activity-clubbox">
              <div className="mypage-profile-info-activity-club">
                참여한 소모임 수
              </div>
              <div className="mypage-profile-info-activity-clubnumber">
                {mockUser.club}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mypage-detail-container">
        <div className="mypage-detail-left-container">
          <ul className="mypage-detail-left-list-container">
            {['활동 내역', '팔로잉', '팔로워', '알림'].map((activity) => (
              <li
                key={activity}
                className={`mypage-detail-left-list ${selectedActivity === activity
                  ? 'mypage-detail-left-list-selected'
                  : ''
                  }`}
                onClick={() => handleActivityClick(activity)}
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`mypage-detail-right-container ${selectedActivity === '활동 내역' ? 'selected-activity' : ''
            }`}
        >
          {selectedActivity === '활동 내역' && <Activity />}
          {selectedActivity === '팔로잉' && (
            <Following userName={mockUser.nickname} />
          )}
          {selectedActivity === '팔로워' && (
            <Follower userName={mockUser.nickname} />
          )}
          {selectedActivity === '알림' && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
