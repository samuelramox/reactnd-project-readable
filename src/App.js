import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount = () => {
    const url = 'http://localhost:3001/posts';
    const headers = { Authorization: 'whatever-you-want' };
    axios({
      method: 'get',
      url,
      headers
    }).then(res => res.data);
  };

  render() {
    return <div />;
  }
}

export default App;
