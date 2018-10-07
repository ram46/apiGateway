import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {Crud, Search} from './components/Services.jsx'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/crud" component={Crud} />
      <Route path="/versions" component={App} />
      <Route path="/stats" component={App} />
      <Route path="/home" component={App} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));



// ReactDOM.render(<App />, document.getElementById('app'));