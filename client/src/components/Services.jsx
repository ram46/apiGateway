import React from 'react';
import ReactDOM from 'react-dom';

// import Frame from 'react-frame-component';


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


function Services(props) {
  return null;
}



export default Services

export {
  Crud,
  Search,
}

