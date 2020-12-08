import axios from 'axios';
import Vue from 'vue';

const BASE_URL = process.env.VUE_APP_URL;

export default class AuthService {
  login(user, remember) {
    return axios
      .post(`${BASE_URL}/login`, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          if (remember) {
            Vue.$cookies.set('accessToken', response.data.accessToken);
            Vue.$cookies.set('refreshToken', response.data.refreshToken);
            delete response.data.accessToken;
            delete response.data.refreshToken;
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            // document.cookie = `accessToken = ' ${response.data.accessToken} ;SameSite=None; secure=true`;
            Vue.$cookies.set('accessToken', response.data.accessToken);
            Vue.$cookies.set('refreshToken', response.data.refreshToken);
            delete response.data.accessToken;
            delete response.data.refreshToken;
            sessionStorage.setItem('user', JSON.stringify(response.data));
          }
        }
        return response.data;
      });
  }

  logout() {
    Vue.$cookies.remove('accessToken');
    Vue.$cookies.remove('refreshToken');

    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    } else {
      localStorage.removeItem('user');
    }
  }
}
