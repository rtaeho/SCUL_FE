import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, { Quill, quillRef } from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { ReactComponent as Select } from '../../assets/images/FilterSelect.svg';
import { ImageDrop } from 'quill-image-drop-module';
import axios from 'axios';
import ImageResize from '@looop/quill-image-resize-module-react'

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
const imageHandler = () => {
    //에디터에서 이미지 버튼을 클릭하면 핸들러 시작

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
        console.log('온체인지');
        const file = input.files[0];
        const formData = new FormData();
        formData.append('img', file);
        try {
            const result = await axios.post('http://localhost:3000/img', formData);
            console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
            const IMG_URL = result.data.url;
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', IMG_URL);
        } catch (error) {
            console.log('이미지 업로드 실패:', error);
        }
    });
};

const CreateInquiry = () => {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('분류 선택');
    const [content, setContent] = useState('');
    const titleRef = useRef(null);

    const toggleOptionDropdown = () => {
        setIsOptionOpen(!isOptionOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOptionOpen(false);
    };

    const handleContentChange = (value) => {
        setContent(value);
    };

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

    const handleSubmit = async () => {
        if (selectedOption === '분류 선택') {
            alert('분류를 선택해 주세요');
            return;
        }
        if (titleRef.current.value.trim() === '') {
            alert('제목을 작성해 주세요');
            return;
        }

        if (content.trim() === '') {
            alert('내용을 입력해 주세요');
            return;
        }

        let redirectUrl = '';
        redirectUrl = `/inquiry`;
        window.location.href = redirectUrl;
    };

    ///   try {
    //     const userToken = 'user-token'; // 실제 유저 토큰으로 대체 필요
    //     await axios.post('http://localhost:3000/post', {
    //       board: selectedBoard,
    //       tag: selectedOption,
    //       title: titleRef.current.value,
    //       content: content,
    //       token: userToken,
    //       sport: selectedSport,
    //     });
    //     // 게시글 등록 성공 시 해당 게시판으로 이동
    //     window.location.href = `/board/${selectedBoard}`;
    //   } catch (error) {
    //     console.error('게시글 등록 실패:', error);
    //   }
    // };

    return (
        <div className="CreatePost">
            <h1>문의/신고</h1>
            <div className="inquiry-setting">
                <div className="createTagDropdown">
                    <button className="set-TagBtn" onClick={toggleOptionDropdown}>
                        {selectedOption}
                        <Select className="selectIcon" />
                    </button>
                    {isOptionOpen && (
                        <div className="inquiry-set-menu">
                            <div onClick={() => handleOptionSelect('문의')}>
                                문의
                            </div>
                            <div onClick={() => handleOptionSelect('버그제보')}>
                                버그제보
                            </div>
                            <div onClick={() => handleOptionSelect('신고')}>
                                신고
                            </div>
                        </div>
                    )}
                </div>
                <input
                    className="inquiry-set-title"
                    placeholder="제목을 입력해 주세요"
                    type="text"
                    ref={titleRef}
                />
            </div>
            <div className="quill">
                <StyledReactQuill
                    value={content}
                    onChange={handleContentChange}
                    modules={CreateInquiry.modules}
                    formats={CreateInquiry.formats}
                    placeholder="내용을 입력해 주세요"
                />
            </div>

            <div className="createBtn">
                <button className="create" onClick={handleSubmit}>
                    작성완료
                </button>
            </div>
        </div>
    );
};

CreateInquiry.modules = {
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
        ['link', 'video'],

    ],
    imageDrop: true,

    imageResize: {
        modules: ['Resize'],

        handlers: {
            image: imageHandler,
        },
    },
};

CreateInquiry.formats = [
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
    'video',
    'color',
    'background',
    'height',
    'width',
];

export default CreateInquiry;
