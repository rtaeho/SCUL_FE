import React, { useEffect, useState } from 'react';

const Main = () => {
  const [sport, setSport] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const sportName = path[1]; // 경로에서 스포츠 이름 추출
    const sportData = JSON.parse(localStorage.getItem('selectedSport'));

    if (sportData && sportData.name.toLowerCase() === sportName) {
      setSport(sportData);
    }
  }, []);

  return (
    <div>
      {sport ? <h1>{sport.name} 페이지</h1> : <h1>스포츠를 선택해주세요.</h1>}
    </div>
  );
};

export default Main;
