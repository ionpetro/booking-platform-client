import Vue from 'vue';
import axios from 'axios';

const BASE_URL = process.env.VUE_APP_URL;

export default function setup() {
  axios.interceptors.request.use(
    config => {
      const user =
        JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
      const token = Vue.$cookies.get('jwtAuth');
      const myConfig = config;
      if (user && token) {
        myConfig.headers.Authorization = `Bearer ${token}`;
      }
      return myConfig;
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
          const refreshToken = Vue.$cookies.get('jwtRefresh');
          return axios
            .post(`${BASE_URL}/token`, {
              jwtRefresh: refreshToken
            })
            .then(res => {
              if (res.status === 201) {
                Vue.$cookies.set('jwtAuth', res.data.jwtAuth);
                axios.defaults.headers.common.Authorization = `Bearer '${Vue.$cookies.get(
                  'jwtAuth'
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
