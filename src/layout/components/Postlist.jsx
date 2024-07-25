import React from 'react';
import { ReactComponent as ViewsIcon } from '../../assets/images/ViewsIcon.svg';
import { ReactComponent as LikesIcon } from '../../assets/images/LikesIcon.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';

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

const Postlist = ({ posts }) => {
  return (
    <ul className="postList">
      {posts.map((post) => (
        <li key={post.id} className="postItem">
          <img
            src={post.imageUrl || DefaultPostImg}
            alt={post.title}
            className="postImg"
          />

          <div className="Wrapper">
            <div className="titleBox">
              <div className="postTag">{post.tag}</div>
              <div className="postTitleWrapper">
                <div className="postTitle">{post.title}</div>
                {post.comments > 0 && (
                  <span className="postComments">{post.comments}</span>
                )}
              </div>
            </div>

            <div className="postInfo">
              <span className="postNickname">{post.nickname}</span>·
              <span className="postTime">{timeForm(post.createdAt)}</span>·
              <span className="postViews">
                <ViewsIcon className="viewsIcon" /> {post.views}
              </span>
              {post.likes > 0 && (
                <span className="postLikes">
                  · <LikesIcon className="likesIcon" /> {post.likes}
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Postlist;
