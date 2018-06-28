import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Categories from './components/Categories';
import Handle from './components/Handle';
import NotFound from './components/NotFound';
import Post from './components/Post';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/categories" component={Categories} />
          <Route path="/:category" component={Posts} />
          <Route path="/:category/:id" component={Post} />
          <Route path="/admin/post" component={Handle} />
          <Route path="/admin/post/:id" component={Handle} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
