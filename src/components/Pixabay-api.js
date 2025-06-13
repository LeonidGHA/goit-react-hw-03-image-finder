// import axios from 'axios';

const axios = require('axios').default;

export class pixabayApi {


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


const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: apiKey,
      page,
      q: searchQuery,
      orientation: 'horizontal',
      safesearch: `true`,
      per_page: 12,
    },
  });

  return data;
};

export default getImages;
