import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/Register';

function App(props) {
  return (
    <BrowserRouter>
    <div>
      

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Routes>
        <Route exact path="/" element = {<LandingPage/>}/>
        <Route exact path="/LoginPage" element = {<LoginPage />} />
        <Route exact path="/RegisterPage" element = {<RegisterPage />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
