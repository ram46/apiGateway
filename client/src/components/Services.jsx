import React from 'react';
import ReactDOM from 'react-dom';


function Crud(props) {
  return (
      // if hosting over domain, replace localhost with mydomain.com
      <iframe src="https://localhost:7777/crud/" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
    )
}


function Search(props) {
  return (
    // if hosting over domain, replace localhost with mydomain.com
      <iframe src="https://localhost:7777/search/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Timeline(props) {
  return (
    // if hosting over domain, replace localhost with mydomain.com
    <iframe src="https://localhost:7777/timeline/"  scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Email(props) {
  return (
    // if hosting over domain, replace localhost with mydomain.com
    <iframe src="https://localhost:7777/email"  scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Home(props) {
  return (
    // if hosting over domain, replace localhost with mydomain.com
    <iframe src="https://localhost:7777/home"  sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Services(props) {
  return null;
}

// the routing for /crud, /email, /search are defined in nginx conf

export default Services

export {
  Crud,
  Search,
  Email,
  Timeline,
  Home
}

