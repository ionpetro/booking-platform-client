import axios from 'axios';

const BASE_URL = process.env.VUE_APP_URL;

export default class UnitService {
  getUnits(page, size) {
    return axios
      .get(`${BASE_URL}/units?page=${page}&size=${size}`)
      .then(({data}) => data)
      .catch(err => this.errorHandler(err));
  }

  getUnitById(id) {
    return axios
      .get(`${BASE_URL}/units/${id}`)
      .then(({data}) => data)
      .catch(err => this.errorHandler(err));
  }

  bookUnitById(book) {
    return axios
      .post(`${BASE_URL}/book`, book)
      .then(({data}) => data)
      .catch(err => {
        if (err.response && err.response.status === 409) {
          const price = err.response.data.price;
          throw new Error(`The price ${price} is outdated. Please try again later`);
        } else if (err.response && err.response.status === 410) {
          const year = err.response.data.bookDate;
          throw new Error(`On ${year} the unit is booked. Please try another one`);
        }
        this.errorHandler(err);
      });
  }

  errorHandler(err) {
    if (err.request) {
      // The request was made but no response was received
      throw new Error('The server is down. Try again in a few minutes');
    }
    // Something happened in setting up the request that triggered an err
    throw new Error('Something went wrong. Try again in a few minutes');
  }
}
