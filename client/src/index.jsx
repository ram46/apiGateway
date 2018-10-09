import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {Crud, Search, Email} from './components/Services.jsx'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/email" component={Email} />
      <Route path="/search" component={Search} />
      <Route path="/crud" component={Crud} />
      <Route path="/timeline" component={App} />
      <Route path="/home" component={App} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));



// ReactDOM.render(<App />, document.getElementById('app'));