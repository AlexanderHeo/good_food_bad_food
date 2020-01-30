import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Enter from './Enter-a-meal';
import EnterEffects from './enter-effects';
import FDAWarning from './fdawarning';
import HomePage from './home-page';
import RateMeal from './rate-meal';
import List from './user-meals-status';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/enter" component={Enter}></Route>
        <Route path="/entereffects" component={EnterEffects}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/warning" component={FDAWarning}></Route>
        <Route path="/rate/:mealId" component={RateMeal}></Route>
      </Router>
    );
  }
}

export default App;
