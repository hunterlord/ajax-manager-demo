import { ajaxManager } from '@/utils/axios';

export default ajaxManager.create({
  name: 'api user login',
  path: 'api.user.login',
  axiosConfig: {
    method: 'post',
    url: '/api/hello',
  },
});
