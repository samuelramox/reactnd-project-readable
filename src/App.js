import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HandleComment from './components/HandleComment';
import HandlePost from './components/HandlePost';
import NotFound from './components/NotFound';
import Post from './components/Post';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/:category" component={Posts} />
          <Route path="/:category/:id" component={Post} />
          <Route path="/admin/post" component={HandlePost} />
          <Route path="/admin/post/:id" component={HandlePost} />
          <Route path="/admin/comment/:idPost/:id" component={HandleComment} />
          <Route path="/admin/comment/:idPost" component={HandleComment} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
