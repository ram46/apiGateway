import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
import {Route, BrowserRouter, Switch} from 'react-router-dom'


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));


// ReactDOM.render(<App />, document.getElementById('app'));