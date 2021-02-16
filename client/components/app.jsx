import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import About from './about';
import Enter from './Enter-a-meal';
import EnterEffects from './enter-effects';
import FDAWarning from './fdawarning';
import HomePage from './home-page';
import Login from './Login';
import LoginSignup from './Login-Signup';
import RateMeal from './rate-meal';
import Signup from './Signup';
import List from './user-meals-status';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper>

        <Router>
          <Route path="/ls" component={LoginSignup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/home" component={HomePage}></Route>
          <Route path="/enter" component={Enter}></Route>
          <Route path="/entereffects" component={EnterEffects}></Route>
          <Route path="/list" component={List}></Route>
          <Route path="/warning" component={FDAWarning}></Route>
          <Route path="/rate/:mealId" component={RateMeal}></Route>
          <Route path="/about" component={About}></Route>
        </Router>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
	color: var(--primary-6);
	font-size: 10px;
	a {
		color: var(--primary-6);
		font-size: 2em;
	}
`;
