import React from 'react';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

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

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
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
        <Route path="/enterfood">
          <EnterFood />
        </Route>
        <Route path="/ratefood">
          <RateFood />
        </Route>
        <Route path="/seetoday">
          <SeeToday />
        </Route>
        <Route path="/seeweek">
          <SeeWeek />
        </Route>
        <Route path="/seemonth">
          <SeeMonth />
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

// You can think of these components as "pages"
// in your app.

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
      <h5>Let's Get Started!</h5>
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
      <h5>FDA Food Recalls</h5>
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

function RateFood() {
  return (
    <div>
      <h1>Rate Food</h1>
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

function SeeMonth() {
  return (
    <div>
      <h1>Monthly Overview</h1>
      <h5>See Day</h5>
      <h5>See Week</h5>
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
