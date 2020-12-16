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
        const {accessToken, refreshToken, ...data} = response.data;
        if (!accessToken) {
          throw new Error('No access token is found');
        }
        Vue.$cookies.set('accessToken', accessToken);
        Vue.$cookies.set('refreshToken', refreshToken);
        delete data.accessToken;
        delete data.refreshToken;
        if (remember) {
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          sessionStorage.setItem('user', JSON.stringify(data));
        }
        return data;
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          // Request made and server responded
          throw new Error('Your credentials are invalid. Please check your spelling');
        }
        if (err.request) {
          // The request was made but no response was received
          throw new Error('The server is down. Try again in a few minutes');
        }
        // Something happened in setting up the request that triggered an err
        throw new Error('Something went wrong. Try again in a few minutes');
      });
  }

  logout() {
    // remove token related cookies
    Vue.$cookies.remove('accessToken');
    Vue.$cookies.remove('refreshToken');

    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    } else {
      localStorage.removeItem('user');
    }
  }
}
