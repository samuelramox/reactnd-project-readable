import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Categories from './components/Categories';
import NotFound from './components/NotFound';
import Post from './components/Post';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/categories" component={Categories} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
