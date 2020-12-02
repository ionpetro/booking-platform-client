import axios from 'axios';
import Vue from 'vue';

const BASE_URL = process.env.VUE_APP_URL;

export default class AuthService {
  login(user, remember) {
    return axios
      .post(`${BASE_URL}/users`, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.jwtAuth) {
          if (remember) {
            // document.cookie = `jwtAuth = ' ${response.data.jwtAuth} ;SameSite=None; secure=true`;
            Vue.$cookies.set('jwtAuth', response.data.jwtAuth);
            Vue.$cookies.set('jwtRefresh', response.data.jwtRefresh);
            delete response.data.jwtAuth;
            delete response.data.jwtRefresh;
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            // document.cookie = `jwtAuth = ' ${response.data.jwtAuth} ;SameSite=None; secure=true`;
            Vue.$cookies.set('jwtAuth', response.data.jwtAuth);
            Vue.$cookies.set('jwtRefresh', response.data.jwtRefresh);
            delete response.data.jwtAuth;
            delete response.data.jwtRefresh;
            sessionStorage.setItem('user', JSON.stringify(response.data));
          }
        }
        return response.data;
      });
  }

  logout() {
    Vue.$cookies.remove('jwtAuth');
    Vue.$cookies.remove('jwtRefresh');

    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    } else {
      localStorage.removeItem('user');
    }
  }
}
