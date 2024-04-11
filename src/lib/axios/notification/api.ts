import INotify from '@/types/notify';
import axiosInstance from '../instance';

/**
 * 백엔드 서버 구독 GET
 * @returns response
 */
const subscribeApi = () => {
  return axiosInstance.get('/event/subscribe');
};

/**
 * 새로운 알림 유무 GET
 * @returns response
 */
const newNotificationApi = () => {
  return axiosInstance.get<{ newEvent: boolean }>('/event/new');
};

/**
 * 알림 내역 조회 GET
 * @returns response
 */
const notifyApi = () => {
  return axiosInstance.get<INotify[]>('/notify');
};

/**
 * 알림 내역 삭제 DELETE
 * @param notificationId
 * @returns status, message
 */
const deleteNotificationApi = (notificationId: number) => {
  return axiosInstance.delete(`/notify/${notificationId}`);
};

export { subscribeApi, newNotificationApi, notifyApi, deleteNotificationApi };
