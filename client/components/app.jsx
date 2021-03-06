import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './Home-Page';
import Login from './Login-Signup/Login';
import Logo from './Login-Signup/Logo';
import Reset from './Login-Signup/ResetPassword';
import Signup from './Login-Signup/Signup';

const App = () => {
  return (
    <Container>
      <Router>
        <Route path="/logo" component={Logo} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={HomePage} />
        <Route path='/reset' component={Reset} />
        <Redirect from='/' to='logo' />
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
