import React from 'react';
// import UserMealStatus from './user-meals-status';

// import SingleMeal from './single-meal'
import FDAWarning from './fdawarning';
import RateMeal from './rate-meal';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

export default function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/openpage">Open Page</Link>
        </li>
        <li>
          <Link to="/enterfood">Enter Food</Link>
        </li>
        <li>
          <Link to="/ratefood">Rate Food</Link>
        </li>
        <li>
          <Link to="/seetoday">See Today</Link>
        </li>
        <li>
          <Link to="/seeweek">See This Week</Link>
        </li>
        <li>
          <Link to="/seemonth">See This Month</Link>
        </li>
        <li>
          <Link to="/goodbadlist">Good / Bad List</Link>
        </li>
        <li>
          <Link to="/choosemeal">Choose A Meal</Link>
        </li>
        <li>
          <Link to="/mynextmeal">My Next Meal</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/openpage">
          <OpenPage />
        </Route>
        <Route path="/fdawarning">
          <FDAWarning />
        </Route>
        <Route path="/enterfood">
          <EnterFood />
        </Route>
        <Route path="/ratefood">
          <RateMeal />
        </Route>
        <Route path="/seetoday">
          <SeeToday />
        </Route>
        <Route path="/seeweek">
          <SeeWeek />
        </Route>
        <Route path="/goodbadlist">
          <GoodBadList />
        </Route>
        <Route path="/choosemeal">
          <ChooseMeal />
        </Route>
        <Route path="/mynextmeal">
          <MyNextMeal />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h5>Login</h5>
      <h5>Create Account</h5>
      <h5>About</h5>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <h5>Lets Get Started!</h5>
    </div>
  );
}

function OpenPage() {
  return (
    <div>
      <h1>Open page</h1>
      <h5>Enter Meal</h5>
      <h5>Choose Meal</h5>
      <h5>Enter Effect</h5>
      <h5>See Good / Bad List</h5>
      <h5>My Next Meal Is...</h5>
      <h5>
        <li>
          <Link to="/fdawarning">FDA Food Recalls</Link>
        </li>
      </h5>
    </div>
  );
}

function EnterFood() {
  return (
    <div>
      <h1>Enter Food</h1>
    </div>
  );
}

function SeeToday() {
  return (
    <div>
      <h1>Daily Overview</h1>
      <h5>See Week</h5>
      <h5>See Month</h5>
      <h5>See Good / Bad List</h5>
    </div>
  );
}

function SeeWeek() {
  return (
    <div>
      <h1>Weekly Overview</h1>
      <h5>See Today</h5>
      <h5>See Month</h5>
      <h5>See Good / Bad List</h5>
    </div>
  );
}

function GoodBadList() {
  return (
    <div>
      <h1>Good / Bad List</h1>
      <h5>Done</h5>
    </div>
  );
}

function ChooseMeal() {
  return (
    <div>
      <h1>Choose Meal</h1>
    </div>
  );
}

function MyNextMeal() {
  return (
    <div>
      <h1>My Next Meal</h1>
      <h5>Done</h5>
    </div>
  );
}
