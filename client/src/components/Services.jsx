import React from 'react';
import ReactDOM from 'react-dom';


function Crud(props) {
  return (
      <iframe src="https://localhost:7777/crud/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
    )
}


function Search(props) {
  return (
      <iframe src="https://localhost:7777/search/" scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Timeline(props) {
  return (
    <iframe src="https://localhost:7777/timeline/"  scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Email(props) {
  return (
    <iframe src="https://localhost:7777/email"  scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
    )
}

function Home(props) {
  return (
    <iframe src="https://localhost:7777/home"  scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms"> </iframe>
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

