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
    this.setState({
      userInfo: userInfo
    })
  }


  render () {
     var button;
     var profile;
     var home;
     var sidenavbar;

    if (!this.state.isLoggedIn) {
      button = <Login handleLogin={this.handleLogin} handleUserInfo={this.handleUserInfo} />
    }


    if (this.state.isLoggedIn) {

      var logo = <img src="https://localhost:7777/brownlogo.png" height="200" width="400"/>

      button = <Logout handleLogoutClick={this.handleLogoutClick} />

      profile = <div> Welcome, {this.state.userInfo['name']}! </div>

      home = (<div>

        <iframe src="https://localhost:7777/crud/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms" > </iframe>

        <br/> <br/><br/> <br/><br/> <br/>

        <iframe src="https://localhost:7777/search/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>

      </div>)

      sidenavbar = (
        <div className="sidenav `${sidenav}`">
          <Link to='/home'> Home </Link>
          <Link to='/crud'> CRUD </Link>
          <Link to='/search'> Search </Link>
          <Link to='/versions'> Analyze </Link>
          <Link to='/stats'> Visualize </Link>
           <Link to='/email'> Subsribe </Link>
        </div>
      )
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





