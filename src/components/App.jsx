import { Component } from 'react';

import css from './App.module.css';

import { pixabayApi } from './Pixabay-api';
import Searchbar from './Searchbar/Searchbar';

const newPixabayApi = new pixabayApi();
class App extends Component {
  state = {
    search: '',
    arrImage: [],
  };

  componentDidMount() {
    // console.log(hits);
    this.onSerachInApi();
  }

  componentDidUpdate() {
    const { search } = this.state;
    // newPixabayApi.querySearch = search;
    // const response = await newPixabayApi.takeSearchResults();
    // const { hits } = response.data;
    if (search === '') {
      // this.onSerachInApi();
    }
    // this.onSerachInApi();
  }

  async onSerachInApi() {
    const { search } = this.state;
    newPixabayApi.querySearch = search;
    const response = await newPixabayApi.takeSearchResults();
    const { hits } = response.data;
    this.setState({ arrImage: [hits] });
  }

  onSubmitData = dataSearch => {
    this.setState({
      search: dataSearch,
    });
  };

  render() {
    const { onSubmitData } = this;
    console.log(this.state.arrImage);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmitData} />
      </div>
    );
  }
}

export default App;
