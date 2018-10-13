import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {Crud, Search, Email} from './components/Services.jsx'




/// To render in email, search, crud etc.. in a same page


///// Cases: 1- render same page 2- render in a different page

///// (1-a) this file would be like below
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));

///// (1-b) The above is equivalent to below because if we want every route to App then we can have just '/' which matches to all /crud, /search, /email...

// Now compare App.jsx of both cases(2) and (4). For case 1 where we send every thing to App, the routing to component happens in App.jsx. But in case 2, we do routing to different components and then App.jsx doesn't have routing.

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/email" component={App} />
//       <Route path="/search" component={App} />
//       <Route path="/crud" component={App} />
//       <Route path="/timeline" component={App} />
//       <Route path="/" component={App} />
//     </Switch>
//   </BrowserRouter>, document.getElementById('app'));


///// 2- App.jsx render method would have router (as below)

   // return (

   //  <div>
   //      {logo}
   //      {button}
   //      <br/>
   //      {profile}
   //      <br/>
   //      {sidenavbar}
   //      <br/>
   //    <Switch>
   //      <Route exact path='/' render={() => <h1> This is home</h1>} />
   //      <Route path='/crud' component={Crud} />
   //      <Route path='/search' component={Search} />
   //      <Route path='/email' component={Email} />
   //    </Switch>
   //  </div>



/// To render in email, search, crud etc.. in a new page/window

///// 3- this file would be like below
// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/email" component={Email} />
//       <Route path="/search" component={Search} />
//       <Route path="/crud" component={Crud} />
//       <Route path="/timeline" component={Timeline} />
//       <Route path="/" component={App} />
//     </Switch>
//   </BrowserRouter>, document.getElementById('app'));


///// 4- App.jsx render method would not have router (as below)

//   return (<div>
//     <div id="content">
//       {logo}
//       {button}
//       {subscribe}
//       <br/>
//       {profile}
//       <br/>
//       {sidenavbar}
//       {home}
//     </div>
//   </div>)
//   }
// }







// ReactDOM.render(<App />, document.getElementById('app'));