import Vue from 'vue';
import axios from 'axios';

export default function setup() {
  axios.interceptors.request.use(
    config => {
      const user =
        JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
      const token = Vue.$cookies.get('accessToken');
      return user && token
        ? {...config, headers: {...config.headers, Authorization: `Bearer ${token}`}}
        : config;
    },
    error => {
      return Promise.reject(error);
    }
  );
}
