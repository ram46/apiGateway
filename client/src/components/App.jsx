import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import Login from './Login.jsx';
import Logout from './Logout.jsx';
import {sidenav} from './Styles/App.css';
import {Crud, Search, Email} from './Services.jsx';


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
     var logo;
     var subscribe;

    if (!this.state.isLoggedIn) {
      button = <Login handleLogin={this.handleLogin} handleUserInfo={this.handleUserInfo} />
    }

    if (this.state.isLoggedIn) {

      logo = <img src="https://localhost:7777/brownlogo.png" height="200" width="400"/>
      button = <Logout handleLogoutClick={this.handleLogoutClick} />
      profile = <div> Welcome, {this.state.userInfo['name']}! </div>
      subscribe = <Email />

      home = (
        <div>
          <Crud />
          <br/> <br/><br/> <br/><br/> <br/>
          <Search />
        </div>
      )

      sidenavbar = (
        <div className="sidenav `${sidenav}`">
          <Link to='/home'> Home </Link>
          <Link to='/crud'> CRUD </Link>
          <Link to='/search'> Search </Link>
          <Link to='/timeline'> Visualize </Link>
          <Link to='/email'> Subscribe </Link>
        </div>
      )
    }

    return (<div>
      <div id="content">
        {logo}
        {button}
        {subscribe}
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





