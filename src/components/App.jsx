import { Component } from 'react';

class App extends Component {
  state = {
    hello: '',
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React homework template Hello Jim
      </div>
    );
  }
}

export default App;
