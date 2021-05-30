import axios from 'axios';
import config from '@/configs'
import AuthenticationUtils from '@/utils/AuthenticationUtils'

const axiosInstance = axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: config.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${AuthenticationUtils.getAccessToken()}`;
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${AuthenticationUtils.getAccessToken()}`;
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalConfig = error.config;
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const refreshToken = AuthenticationUtils.getRefreshToken();
      if (!refreshToken) {
        AuthenticationUtils.removeAuthenticationData();
        window.localStorage.clear();
        return;
      }
      return axios.post(
        `${config.API_DOMAIN}/api/refresh-token`,
        {
          refreshToken,
        },
      )
        .then(res => {
          if (res.status === 200) {
            const result = res.data;
            const data = result.data;
            AuthenticationUtils.saveAuthenticationData({ token: data.token, refreshToken })
            originalConfig.headers.Authorization = `${data.token}`;
            return axios(originalConfig);
          } else {
            AuthenticationUtils.removeAuthenticationData();
            window.localStorage.clear();
          }
        })
        .catch(() => {
          AuthenticationUtils.removeAuthenticationData();
          window.localStorage.clear();
        });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
