import axios from 'axios';

const BASE_URL = process.env.VUE_APP_URL;

export default class UnitService {
  getUnits(page, size) {
    return axios
      .get(`${BASE_URL}/units?page=${page}&size=${size}`)
      .then(response => response.data)
      .catch(err => {
        if (err.request) {
          // The request was made but no response was received
          throw new Error('The server is down. Try again in a few minutes');
        }
        // Something happened in setting up the request that triggered an err
        throw new Error('Something went wrong. Try again in a few minutes');
      });
  }

  getUnitById(id) {
    return axios
      .get(`${BASE_URL}/units/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.request) {
          // The request was made but no response was received
          throw new Error('The server is down. Try again in a few minutes');
        }
        // Something happened in setting up the request that triggered an err
        throw new Error('Something went wrong. Try again in a few minutes');
      });
  }
}
