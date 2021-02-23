import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
// import About from './about';
// import Enter from './Enter-a-meal';
// import EnterEffects from './enter-effects';
// import FDAWarning from './fdawarning';
import HomePage from './Home-Page';
import Login from './Login';
import Logo from './Logo';
// import List from './user-meals-status';
import ResetPassword from './ResetPassword';
// import RateMeal from './rate-meal';
import Signup from './Signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper>

        <Router>
          <Route path="/logo" component={Logo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/home" component={HomePage}></Route>
          <Route path='/reset' component={ResetPassword} />
          {/* <Route path="/enter" component={Enter}></Route> */}
          {/* <Route path="/entereffects" component={EnterEffects}></Route> */}
          {/* <Route path="/list" component={List}></Route> */}
          {/* <Route path="/warning" component={FDAWarning}></Route> */}
          {/* <Route path="/rate/:mealId" component={RateMeal}></Route> */}
          {/* <Route path="/about" component={About}></Route> */}
          <Redirect from='/' to='logo' />
        </Router>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	color: var(--primary-6);
	font-size: 12px;
	a {
		color: var(--primary-6);
		font-size: 1.4em;
	}
`;
