import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export default class AuthService {
  login(user, remember) {
    return axios
      .post(`${API_URL}/users`, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.jwt) {
          if (remember) {
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            sessionStorage.setItem('user', JSON.stringify(response.data));
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    } else {
      localStorage.removeItem('user');
    }
  }
}
