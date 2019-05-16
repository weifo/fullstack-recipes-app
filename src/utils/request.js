import axios from 'axios';
// import { getCookie } from './CookieManager';
import { message } from 'antd';

const httpService = axios.create({
  baseURL: '/api'
});

httpService.interceptors.request.use(
  (config) => {
    // const csrfToken = getCookie('token');
    // // config.headers.credentials = 'include';
    // // config.headers['X-CSRF-TOKEN'] = isNull(csrfToken) ? '' : csrfToken;
    // if (csrfToken) {
    //   config.headers['Authorization'] = `Bearer ${csrfToken}`;
    // }
    return config;
  },
  err => Promise.reject(err)
);

httpService.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data;
    if (response) {
      switch (meta.status) {
        case 0:
          return Promise.resolve(data);
        // 在此处对response异常进行处理
        case 1:
          message.warn('请登录！');
          location.hash = '#/login';
          break;
        case 2:
          message.error(meta.msg);
          break;
        case 4:
          message.error(meta.msg);
          break;
        default:
          message.error(meta.msg);
          return Promise.reject(data);
      }
    }
    return Promise.reject({ meta: { status: -1, msg: '接口格式错误' } });
  },
  (error) => {
    return Promise.reject({
      meta: {
        status: -2,
        msg: '网络请求错误',
        err: error
      }
    });
  }
);

export default httpService;
