import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ImageDrop } from 'quill-image-drop-module';
import { format } from 'date-fns';
import axios from 'axios';
import ImageResize from '@looop/quill-image-resize-module-react';
import { AdjustInput } from './input/index';

import { ReactComponent as CalendarPrev } from '../../assets/images/CalendarPrev.svg';
import { ReactComponent as CalendarNext } from '../../assets/images/CalendarNext.svg';
import { ko } from 'date-fns/locale/ko';
const formatingDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
//지역
const locations = {
  전체: ['전체'],
  서울: [
    '전체',
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
  ],
  부산: [
    '전체',
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
  ],
  대구: [
    '전체',
    '남구',
    '달서구',
    '달성군',
    '동구',
    '북구',
    '서구',
    '수성구',
    '중구',
  ],
  인천: [
    '전체',
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
  ],
  광주: ['전체', '광산구', '남구', '동구', '북구', '서구'],
  대전: ['전체', '대덕구', '동구', '서구', '유성구', '중구'],
  울산: ['전체', '남구', '동구', '북구', '울주군', '중구'],
  세종: ['전체', '세종시'],
  경기도: [
    '전체',
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
  ],
  강원도: [
    '전체',
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
  ],
  충청북도: [
    '전체',
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
  ],
  충청남도: [
    '전체',
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
  ],
  전라북도: [
    '전체',
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
  ],
  전라남도: [
    '전체',
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
  ],
  경상북도: [
    '전체',
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
  ],
  경상남도: [
    '전체',
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
  ],
  제주도: ['전체', '서귀포시', '제주시'],
};

// 전역 스코프에 Quill 인스턴스 등록
window.Quill = Quill;

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor strong {
    font-weight: 700;
  }
  .ql-editor em {
    font-style: italic;
  }
  .ql-editor img {
    max-width: none;
    width: auto;
    height: auto;
  }
`;

//Firebase Storage로 이미지 처리하기
//참고 :: https://yhuj79.github.io/React/230214/

const formatDate = (date) => {
  return date ? format(date, 'MM.dd', { locale: ko }) : '날짜 선택';
};

const CreateClub = () => {
  const dropdownRef = useRef();
  const datePickerRef = useRef();

  const [members, setMembers] = useState('');
  const [expense, setExpense] = useState('');
  const [files, setFiles] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCityItem, setSelectedCityItem] = useState(null);
  const [selectedDistrictItem, setSelectedDistrictItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [content, setContent] = useState('');
  const titleRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const { sport, clubId } = useParams();
  const nav = useNavigate();

  // 사이트 탈주 알림
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  //마감일선택 제한
  useEffect(() => {
    if (startDate < endDate) {
      setEndDate('');
    }
  }, [startDate, endDate]);

  //드롭다운 창 관리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowEndDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  // 숫자만 입력받도록 정규식 사용
  const handleMembersChange = (value) => {
    setMembers(value);
  };

  const handleExpenseChange = (value) => {
    setExpense(value);
  };

  const formatExpenseValue = (value) => {
    return Number(value).toLocaleString() + ' 원';
  };

  const formatMembersValue = (value) => {
    return value + ' 명';
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedDistrict('전체');
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setShowDropdown(false);
  };

  //모집일
  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false);
  };

  //마감일
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setShowEndDatePicker(false);
  };

  //? 이거 뭐더라..
  const handleContentChange = (value) => {
    setContent(value);
  };
  /*

*/
  const handleSubmit = async () => {
    // Validation
    if (!members) {
      alert('인원을 입력해 주세요');
      return;
    }
    if (!expense) {
      alert('비용을 입력해 주세요');
      return;
    }
    if (!selectedCity || !selectedDistrict) {
      alert('장소를 선택해 주세요');
      return;
    }
    if (!startDate) {
      alert('날짜를 선택해 주세요');
      return;
    }
    if (!endDate) {
      alert('마감일을 선택해 주세요');
      return;
    }
    if (!titleRef.current.value) {
      alert('제목을 입력해 주세요');
      return;
    }
    if (!content) {
      alert('내용을 입력해 주세요');
      return;
    }

    const openChatLink = document.querySelector(
      'input[placeholder="문의용 오픈 채팅 링크를 입력해 주세요"]'
    ).value;
    const participantLink = document.querySelector(
      'input[placeholder="소모임 참가용 오픈 채팅 링크를 입력해 주세요"]'
    ).value;
    if (!openChatLink) {
      alert('문의용 오픈 채팅 링크를 입력해 주세요');
      return;
    }
    if (!participantLink) {
      alert('소모임 참가용 오픈 채팅 링크를 입력해 주세요');
      return;
    }
    // Create a FormData object
    const formData = new FormData();
    const selectedSports = JSON.parse(localStorage.getItem('selectedSport'));
    const sportsName = selectedSports?.name || '';

    // Append additional club data to the FormData object
    formData.append('clubName', titleRef.current.value);
    formData.append('clubContent', content);
    formData.append('clubPlace', `${selectedCity} ${selectedDistrict}`);
    formData.append('clubDate', formatingDate(startDate));
    formData.append('clubEndDate', formatingDate(endDate));
    formData.append('clubTotalNumber', members);
    formData.append('clubCost', expense);
    formData.append('clubQnaLink', openChatLink);
    formData.append('clubParticipateLink', participantLink);
    formData.append('sportsName', sportsName);
    files.forEach((file) => {
      if (file.isNew) {
        formData.append('clubImage', file.file);
      } else {
        formData.append('imageUrls', file.url);
      }
    });

    const accessToken = localStorage.getItem('accessToken');
    try {
      if (clubId) {
        await axios.put(`/club/${clubId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert('게시글이 성공적으로 수정되었습니다.');
      } else {
        await axios.post('/club', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert('게시글이 성공적으로 등록되었습니다.');
        nav(-1);
      }
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };
  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
    <div className="custom-header">
      <button onClick={decreaseMonth} className="custom-nav-button-prev">
        <CalendarPrev />
      </button>
      <span className="react-datepicker__current-month">
        {format(date, 'yyyy년 M월', { locale: ko })}
      </span>
      <button onClick={increaseMonth} className="custom-nav-button-next">
        <CalendarNext />
      </button>
    </div>
  );

  return (
    <div className="CreateClub">
      <h1>글 작성하기</h1>
      <div className="clubSetting">
        <div className="clubSetting-1">
          <div className="create-club-member">
            <AdjustInput
              placeholder={'인원을 입력해 주세요'}
              onValueChange={handleMembersChange}
              formatValue={formatMembersValue}
            />
          </div>
          <div className="create-club-expense">
            <AdjustInput
              placeholder="비용을 입력해 주세요"
              onValueChange={handleExpenseChange}
              formatValue={formatExpenseValue}
            />
          </div>
          <div ref={dropdownRef}>
            <button
              className="create-club-location-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedCity === '' && selectedDistrict === ''
                ? '장소 선택'
                : selectedCity !== '전체' && selectedDistrict === '전체'
                ? `${selectedCity}`
                : selectedCity === '전체' && selectedDistrict === '전체'
                ? '전체'
                : `${selectedDistrict}`}
            </button>
            {showDropdown && (
              <div className="create-club-dropdown-container">
                <div className="create-club-dropdown-head">
                  <p className="CCDH-1">시/도</p>
                  <p className="CCDH-2">시/군/구</p>
                </div>
                <div className="create-club-dropdown-body">
                  <div className="create-club-dropdown-section-1">
                    <ul>
                      {Object.keys(locations).map((city) => (
                        <li
                          key={city}
                          onClick={() => {
                            handleCityClick(city);
                            setSelectedCityItem(city);
                          }}
                          className={
                            selectedCityItem === city ? 'selected' : ''
                          }
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="create-club-dropdown-section-2">
                    <ul>
                      {locations[selectedCity] &&
                        locations[selectedCity].map((district) => (
                          <li
                            key={district}
                            onClick={() => {
                              handleDistrictClick(district);
                              setSelectedDistrictItem(district);
                            }}
                            className={
                              selectedDistrictItem === district
                                ? 'selected'
                                : ''
                            }
                          >
                            {district}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="create-club-date">
            <button
              className="create-club-date-btn"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              {formatDate(startDate)}
            </button>
            {showDatePicker && (
              <div ref={datePickerRef} className="create-club-date-calendar">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  locale={ko}
                  minDate={new Date()}
                  renderCustomHeader={renderCustomHeader}
                  inline
                />
              </div>
            )}
          </div>
          <div className="create-club-date">
            {startDate ? (
              <button
                className="create-club-date-btn"
                onClick={() => setShowEndDatePicker(!showEndDatePicker)}
              >
                {endDate ? formatDate(endDate) : '마감일 선택'}
              </button>
            ) : (
              <button className="create-club-date-btn-disabled" disabled>
                마감일 선택
              </button>
            )}
            <div className="create-club-date-calendar">
              {showEndDatePicker && (
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="yyyy/MM/dd"
                  locale={ko}
                  minDate={new Date()}
                  maxDate={startDate}
                  renderCustomHeader={renderCustomHeader}
                  inline
                  disabledKeyboardNavigation
                />
              )}
            </div>
          </div>
        </div>
        <div className="clubSetting-2">
          <input
            placeholder="문의용 오픈 채팅 링크를 입력해 주세요"
            type="text"
          />
          <input
            placeholder="소모임 참가용 오픈 채팅 링크를 입력해 주세요"
            type="text"
          />
        </div>

        <input
          className="set-club-title"
          placeholder="소모임 제목을 입력해 주세요"
          type="text"
          ref={titleRef}
        />
      </div>
      <div className="quill">
        <StyledReactQuill
          value={content}
          onChange={handleContentChange}
          modules={CreateClub.modules}
          formats={CreateClub.formats}
          placeholder="내용을 입력해 주세요"
        />
      </div>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="uploadedFiles">
        {files.map((file, index) => (
          <div key={index} className="fileItem">
            <img
              src={file.url}
              alt={`file preview ${index}`}
              className="filePreview"
            />
            <button onClick={() => handleFileDelete(index)}>삭제</button>
          </div>
        ))}
      </div>
      <div className="createBtn">
        <button className="create" onClick={handleSubmit}>
          소모임 등록
        </button>
      </div>
    </div>
  );
};

CreateClub.modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [
      { align: '' },
      { align: 'center' },
      { align: 'right' },
      { align: 'justify' },
    ],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
  ],
};

CreateClub.formats = [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'align',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'background',
  'height',
  'width',
];

export default CreateClub;
