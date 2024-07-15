import axios from 'axios';
import Cookies from 'js-cookie';
import { flattenSidebarOptions } from '../components/functions/math';

export const getCodingSidebar = async () => {
  try {
    const response = await axios.get('/api/coding/sidebar');
    return response.data;
  } catch (error) {
    console.error('coding sidebar fetch 오류:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const postCodingSidebar = async ({ sidebarName, parentId }) => {
  const token = Cookies.get('authToken');

  if (!token) {
    console.log(
      '로그인을 진행해야 coding 페이지 sidebar를 생성할 수 있습니다.'
    );
    return;
  }

  try {
    const response = await axios.post(
      '/api/coding/sidebar',
      { sidebarName, parentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('coding sidebar post 오류:', error);
  }
};

export const getCodingSidebarOptions = async () => {
  try {
    const response = await axios.get('/api/coding/sidebar');
    const flattenedOptions = flattenSidebarOptions(response.data);
    return flattenedOptions;
  } catch (error) {
    console.error('coding sidebar 옵션 fetch 오류:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const postCodingPost = async (postData) => {
  const authToken = Cookies.get('authToken');
  try {
    const response = await axios.post('/api/coding/post', postData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('coding post post 오류:', error);
    throw error;
  }
};

export const getCodingPostList = async (sidebarId) => {
  try {
    const response = await axios.get(`/api/coding/post/${sidebarId}`);
    return response.data;
  } catch (error) {
    console.error('coding post post 오류:', error);
    throw error;
  }
};

export const getCodingPost = async (sidebarId, postId) => {
  try {
    const response = await axios.get(
      `/api/coding/post/${sidebarId}/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('coding post fetch 오류:', error);
  }
};

export const putCodingPost = async (postId, postData) => {
  const authToken = Cookies.get('authToken');
  try {
    const response = await axios.put(`/api/coding/post/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('coding post put 오류:', error);
    throw error;
  }
};
