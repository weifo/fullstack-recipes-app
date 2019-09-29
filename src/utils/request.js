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
    const {data,status} = response;
    if (status==200) {
      message.success('请求成功！')
      return Promise.resolve(data);
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
