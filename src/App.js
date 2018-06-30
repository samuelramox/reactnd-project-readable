import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import NotFound from './components/NotFound';
import HandlePost from './components/HandlePost';
import HandleComment from './components/HandleComment';
import Header from './components/Header';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/admin/post/:id" component={HandlePost} />
      <Route path="/admin/post" component={HandlePost} />
      <Route path="/admin/comment/:idPost/:id" component={HandleComment} />
      <Route path="/admin/comment/:idPost" component={HandleComment} />
      <Route path="/:category/:id" component={Post} />
      <Route path="/:category" component={Posts} />
      <Route exact path="/" component={Posts} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
