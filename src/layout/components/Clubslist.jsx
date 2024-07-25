import React from 'react';
import { ReactComponent as Personnel } from '../../assets/images/Personnel.svg';
import { ReactComponent as Pin } from '../../assets/images/Pin.svg';
import { ReactComponent as Calendar } from '../../assets/images/Calendar.svg';
import DefaultPostImg from '../../assets/images/DefaultPostImg.jpg';

//날짜 표기 변동
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};

const Clublist = ({ clubs }) => {
  return (
    <ul className="clubList">
      {clubs.map((club) => (
        <li key={club.id} className="clubItem">
          <img
            src={club.imageUrl || DefaultPostImg}
            alt={club.title}
            className="clubImg"
          />

          <div className="clubWrapper">
            <div className="clubTitle">{club.title}</div>

            <span className="clubDate">
              <Calendar className="calendarIcon" /> {formatDate(club.date)}
            </span>

            <span className="clubMemNum">
              <Personnel className="personnelIcon" /> {club.capacity}명
            </span>

            <span className="clubLocate">
              <Pin className="pinIcon" /> {club.location}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Clublist;
