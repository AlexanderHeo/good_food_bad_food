import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ListHeader from './list-header';
import DailyList from './daily-list';
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
        <div>
          <ListHeader weekday={currentDate} />
          <ul>
            <li>
              <Link to="/">Daily</Link>
            </li>
            <li>
              <Link to="/week">Weekly</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <DailyList weekday={userData.filter(element => this.getWeekday(element.eatenAt) === currentDate)} />
            </Route>
            <Route path="/week">
              <WeeklyList week={userData.filter(element => this.getWeek(element.eatenAt))} getWeekDay={this.getWeekday} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
