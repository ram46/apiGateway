import React from 'react';
import $ from 'jquery';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }


  onSuccess(googleUser) {
    // debugger
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    this.props.handleLogin();

    var profile = googleUser.getBasicProfile();
    var token = googleUser.getAuthResponse();

    var userInfo = {
      token: token,
      email: profile.getEmail(),
      name: profile.getName(),
      givenName: profile.getGivenName()
    }


    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


    var data = {"profile": userInfo};

    this.props.handleUserInfo(userInfo);

     fetch('/login', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res)
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

  }

  onFailure(error) {
    // debugger
    console.log(error);
  }

  renderButton() {
    // debugger
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }


  componentDidMount() {
    this.renderButton()
  }


  render() {
    return (
        <div id='my-signin2' className="g-signin2" data-theme="light"></div>
    )
  }
}


export default Login;