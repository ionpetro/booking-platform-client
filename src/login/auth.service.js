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
        if (remember) {
          console.log('save to local storage', response);
        } else {
          console.log('save to session storage', response);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
