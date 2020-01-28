import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DailyList from './daily-list';
import ListHeader from './list-header';
import WeeklyList from './weekly-list';

export default class StatusList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.getWeekday = this.getWeekday.bind(this);
    this.getWeek = this.getWeek.bind(this);
  }

  componentDidMount() {
    fetch('/api/list')
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(`Error: ${err}`));
  }

  getWeekday(targetDate) {
    let date;
    if (targetDate) {
      date = new Date(targetDate);
    } else {
      date = new Date();
    }
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date).toLowerCase();
  }

  getWeek(targetDate) {
    const begin = new Date();
    const currentDay = begin.getDay();
    const distance = 0 - currentDay;
    begin.setDate(begin.getDate() + distance);
    const end = new Date();
    const distance2 = 6 - currentDay;
    end.setDate(end.getDate() + distance2);

    const target = new Date(targetDate);
    if (target > begin && target < end) {
      return targetDate;
    }
  }

  render() {
    const userData = this.state.data;
    if (!userData[0]) return null;
    const currentDate = this.getWeekday();
    return (
      <Router>
        <div className="container">

          <div className="row">
            <h1 className="header mt-4 mx-auto">
              <span>See All Foods and Effects</span>
            </h1>
          </div>
          <ListHeader weekday={currentDate} />
          <div className="mx-auto">
            <Link className="seeListButton col-sm-6" to="/">Daily</Link>
            <Link className="seeListButton col-sm-6" to="/week">Weekly</Link>
          </div>
          <div className="seeList">
            <Switch>
              <Route exact path="/">
                <DailyList weekday={userData.filter(element => this.getWeekday(element.eatenAt) === currentDate)} />
              </Route>
              <Route path="/week">
                <WeeklyList week={userData.filter(element => this.getWeek(element.eatenAt))} getWeekDay={this.getWeekday} />
              </Route>
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}
