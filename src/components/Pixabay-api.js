// import axios from 'axios';

const axios = require('axios').default;

export class pixabayApi {
  #API_KEY = '28723731-5c15bd07d095f3f0e05de01ba';
  #URL = 'https://pixabay.com/api/';

  constructor() {
    this.page = 1;
    this.per_page = 12;
    this.querySearch = null;
  }

  takeSearchResults() {
    return axios.get(`${this.#URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.querySearch,
        orientation: 'horizontal',
        safesearch: `true`,
        page: this.page,
        per_page: this.per_page,
      },
    });
  }
}
