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
    this.handleUserInfo = this.handleUserInfo.bind(this);

    this.state = {
      services: [],
      isLoggedIn: false,
      userInfo: {}
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


  handleUserInfo(userInfo) {
    console.log('insideeee handleUserInfo', userInfo);
    this.setState({
      userInfo: userInfo
    })
  }


  // http://i67.tinypic.com/35mkxhy.png
  // http://i67.tinypic.com/dwz149.png

  render () {
     var button;
     var profile;
     var home;
     var sidenavbar;

     var logo = <img src="http://i68.tinypic.com/2cxtj60.png" />
     // var logo = <img src="https://localhost:7777/brownlogo.png" height="200" width="400"/>

    if (!this.state.isLoggedIn) {
      button = <Login handleLogin={this.handleLogin} handleUserInfo={this.handleUserInfo} />
    }


    if (this.state.isLoggedIn) {
      button = <Logout handleLogoutClick={this.handleLogoutClick} />

      profile = <div> Welcome, {this.state.userInfo['name']}! </div>

      home = <div>  <iframe src="https://localhost:7777/crud/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms" > </iframe> <br/> <br/><br/> <br/><br/> <br/> <iframe src="https://localhost:7777/search/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe> </div>
      sidenavbar = <div className="sidenav `${sidenav}`"><Link to='/home'> Home </Link>  <Link to='/versions'> Versions </Link>  <Link to='/stats'> Stats </Link>  <Link to='/search'> Search </Link> <Link to='/stats'> Stats </Link>  <Link to='/crud'> CRUD </Link> </div>
      }

    return (<div>
      <div id="content">
        {logo}
        {button}
        <br/>
        {profile}
        <br/>
        {sidenavbar}
        {home}
      </div>
    </div>)
  }
}

export default App





