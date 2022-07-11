import { ajaxManager } from '@/utils/axios';

export const path = 'api.user.remove';
export default (id, store) =>
  ajaxManager.dynamic(
    id,
    store
  )({
    name: 'user remove',
    path,
    axiosConfig: {
      method: 'delete',
      url: '/api/user/remove',
    },
  });
