import Vue from 'vue';
import axios from 'axios';

const BASE_URL = process.env.VUE_APP_URL;

export default function setup() {
  axios.interceptors.request.use(
    config => {
      const user =
        JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
      const token = Vue.$cookies.get('accessToken');
      return user && token
        ? {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${token}`
            }
          }
        : config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle token expiration
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const originalRequest = error.config;
      if (originalRequest.url === `${BASE_URL}/token`) {
        if (error.response.status === 401) {
          this.$router.push('/login');
        }
        return Promise.reject(error);
      }

      if (!originalRequest._retry && error.response) {
        if (error.response.status === 401) {
          originalRequest._retry = true;
          const refreshToken = Vue.$cookies.get('refreshToken');
          return axios
            .post(`${BASE_URL}/token`, {
              refreshToken
            })
            .then(res => {
              if (res.status === 200) {
                Vue.$cookies.set('accessToken', res.data.accessToken);
                axios.defaults.headers.common.Authorization = `Bearer '${Vue.$cookies.get(
                  'accessToken'
                )}`;
                return axios(originalRequest);
              }
              return {};
            });
        }
      }
      return Promise.reject(error);
    }
  );
}
