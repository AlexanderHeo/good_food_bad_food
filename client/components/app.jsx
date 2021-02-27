import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './Home-Page';
import Login from './Login-Signup/Login';
import LoginSignup from './Login-Signup/Login-Signup';
import Signup from './Login-Signup/Signup';

const App = () => {
  return (
    <Container>
      <Router>
        <Route path="/ls" component={LoginSignup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" component={HomePage}></Route>
        <Redirect from='/' to='login' />
      </Router>
    </Container>
  )
}

export default App;

const Container = styled.div`
	width: 100%;
	height: 100%;
	color: var(--primary-6);
	font-size: 12px;
	a {
		color: var(--primary-6);
		font-size: 1.4em;
	}
`;
