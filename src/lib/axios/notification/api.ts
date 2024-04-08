import axiosInstance from '../instance';

/**
 * 백엔드 서버 구독 GET
 * @returns response
 */
const subscribeApi = () => {
  return axiosInstance.get('/event/subscribe');
};

export default subscribeApi;
