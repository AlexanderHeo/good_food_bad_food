import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './home-page';
import Enter from './Enter-a-meal';
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
        <Route path="/rate" component={RateMeal}></Route>
        <Route path="/list" component={List}></Route>
      </Router>
    );
  }
}

export default App;
