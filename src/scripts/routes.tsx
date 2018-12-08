import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/app';
import Container from './pages/_container';
import NewOep4Token from './pages/NewOep4Token';

export function getRoutes() {
  return (
    <Route path='/' component={Container}>
      <IndexRoute component={App} />
      <Route path='oep4' component={NewOep4Token} />
    </Route>
  );
}
