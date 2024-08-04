import React, { useState } from 'react';
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
import { ReactComponent as PostIcon } from '../../assets/images/Post.svg';

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
  Soccer: SoccerIcon, // 축구 아이콘
  Baseball: BaseballIcon, // 야구 아이콘
  Basketball: BasketballIcon, // 농구 아이콘
  Badminton: BadmintonIcon, // 배드민턴 아이콘
  Bowling: BowlingIcon, // 볼링 아이콘
  Climbing: ClimbingIcon, // 클라이밍 아이콘
  Boxing: BoxingIcon, // 복싱 아이콘
  Tennis: TennisIcon, // 테니스 아이콘
  Cycling: CyclingIcon, // 사이클 아이콘
  Golf: GolfIcon, // 골프 아이콘
  Swimming: SwimmingIcon, // 수영 아이콘
  Running: RunningIcon, // 런닝 아이콘
  Pilates: PilatesIcon, // 필라테스 아이콘
  Hiking: HikingIcon, // 등산 아이콘
  CrossFit: CrossFitIcon, // 크로스핏 아이콘
  TableTennis: TableTennisIcon, // 탁구 아이콘
  Yoga: YogaIcon, // 요가 아이콘
};

const sportName = '축구';

const renderSportIcon = (sport) => {
  const englishName = sportsList.find((s) => s.name === sport)?.englishName;
  const SvgComponent = sportIcons[englishName];
  return SvgComponent ? (
    <SvgComponent className="mypage-profile-info-sport-icon" />
  ) : null;
};

const Tags = ({ tagList, selectedTag, handleTagClick }) => {
  const getTagCount = (tag) => {
    // 태그별 개수를 반환하는 로직을 여기에 추가할 수 있습니다.
    return 10;
  };

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
const timeForm = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 목업 데이터 생성 함수
const generateMockPosts = (numPosts) => {
  // 랜덤 정수 생성
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // 배열에서 랜덤 요소 선택
  const getRandomArrayElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  // 랜덤 날짜 생성
  const generateRandomDate = () => {
    const start = new Date();
    const end = new Date();
    end.setFullYear(start.getFullYear() - 1); // 1년 전
    return new Date(
      start.getTime() - Math.random() * (start.getTime() - end.getTime())
    ).toISOString();
  };
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
  const boards = ['작성글', '댓글', '참여한 소모임', '좋아요한 글'];

  const posts = [];

  for (let i = 0; i < numPosts; i++) {
    posts.push({
      id: `${i + 1}`, // 고유 ID
      sportType: getRandomArrayElement(sports),
      boardType: getRandomArrayElement(boards),
      title: `제목 ${i + 1}`, // 제목
      comments: getRandomInt(0, 50), // 댓글 수
      createdAt: generateRandomDate(), // 작성 날짜
    });
  }

  return posts;
};

const Posts = ({ posts }) => {
  return (
    <div className="contents-post-container">
      {posts.map((post) => (
        <div key={post.id} className="contents-post-list-container">
          <div className="contents-post-details">
            <PostIcon className="contents-post-icon" />
            <div
              className="contents-post-box"
              onClick={() => {
                // 해당 post로 이동
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
            <div className="contents-post-time">{timeForm(post.createdAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
const Comments = () => <div>댓글 내용</div>;
const ParticipatedClub = () => <div>참여한 소모임 내용</div>;
const LikedPosts = () => <div>좋아요한 글 내용</div>;

const Activity = () => {
  const activityTags = ['작성글', '댓글', '참여한 소모임', '좋아요한 글'];
  const [selectedTag, setSelectedTag] = useState(activityTags[0]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const renderContent = () => {
    switch (selectedTag) {
      case '작성글':
        return <Posts posts={generateMockPosts(100)} />;
      case '댓글':
        return <Comments />;
      case '참여한 소모임':
        return <ParticipatedClub />;
      case '좋아요한 글':
        return <LikedPosts />;
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
      />
      {renderContent()}
    </div>
  );
};

const Following = () => {
  return <div>팔로잉 내용</div>;
};

const Follower = () => {
  return <div>팔로워 내용</div>;
};

const Notification = () => {
  const notificationTags = ['전체', '읽음', '안읽음'];
  const [selectedTag, setSelectedTag] = useState(notificationTags[0]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <div>
      <Tags
        tagList={notificationTags}
        selectedTag={selectedTag}
        handleTagClick={handleTagClick}
      />
      <div className="notification-content">알림 내용</div>
    </div>
  );
};

const MyPage = () => {
  const [selectedActivity, setSelectedActivity] = useState('활동 내역');

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <div className="mypage-container">
      <div className="mypage-title">마이페이지</div>
      <div className="mypage-profile-container">
        <ProfileImage className="mypage-profile-image" />
        <div className="mypage-profile-info-container">
          <div className="mypage-profile-info-namebox">
            <div className="mypage-profile-info-name">도라산너구리</div>
            <div className="mypage-profile-info-edit">회원정보 수정</div>
          </div>
          <div className="mypage-profile-info-sportsbox">
            {renderSportIcon(sportName)}
            <div className="mypage-profile-info-sport-name">{sportName}</div>
          </div>
          <div className="mypage-profile-info-activitybox">
            <div className="mypage-profile-info-activity-followingbox">
              <div className="mypage-profile-info-activity-following">
                팔로잉
              </div>
              <div className="mypage-profile-info-activity-followingnumber">
                25
              </div>
              <div></div>
            </div>
            <div className="mypage-profile-info-activity-followerbox">
              <div className="mypage-profile-info-activity-follower">
                팔로워
              </div>
              <div className="mypage-profile-info-activity-followernumber">
                36
              </div>
            </div>
            <div className="mypage-profile-info-activity-clubbox">
              <div className="mypage-profile-info-activity-club">
                참여한 소모임 수
              </div>
              <div className="mypage-profile-info-activity-clubnumber">5</div>
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
                className={`mypage-detail-left-list ${
                  selectedActivity === activity
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
        <div className="mypage-detail-right-container">
          {selectedActivity === '활동 내역' && <Activity />}
          {selectedActivity === '팔로잉' && <Following />}
          {selectedActivity === '팔로워' && <Follower />}
          {selectedActivity === '알림' && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
