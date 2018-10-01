import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

import {sidenav} from './Styles/App.css';
import {Link} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

    this.state = {
      services: [],
      isLoggedIn: false
    }
  }


  componentDidMount() {
    $.ajax({
      url: '/monitor',
      success: (data) => {
        this.setState({
          services: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleLogin() {
      this.setState({
        isLoggedIn: true
      })
    }

  handleLogoutClick() {
      this.setState({
        isLoggedIn: false
      })
  }

  // http://i67.tinypic.com/35mkxhy.png
  // http://i67.tinypic.com/dwz149.png

  render () {
     var button;
     var home;
     var sidenavbar;
     var logo = <img src="http://i68.tinypic.com/2cxtj60.png" />
    if (!this.state.isLoggedIn) {
      button = <Login handleLogin={this.handleLogin}/>
    }


    if (this.state.isLoggedIn) {
      button = <Logout handleLogoutClick={this.handleLogoutClick} />
      home = <div>  <iframe src="https://localhost:7777/crud/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms" > </iframe> <br/> <br/><br/> <br/><br/> <br/> <iframe src="https://localhost:7777/search/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe> </div>
      sidenavbar = <div className="sidenav `${sidenav}`"><Link to='/home'> home </Link>  <Link to='/versions'> versions </Link>   <Link to='/read'> stats </Link>  <Link to='/update'> update </Link> </div>
      }

    return (<div>
      <div id="content">
        {logo}
        {button}
        <br/>
        {sidenavbar}
        {home}
      </div>
    </div>)
  }
}

export default App





