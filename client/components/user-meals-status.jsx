import React from 'react';
import ListHeader from './list-header';
import DailyList from './daily-list';

export default class StatusList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.getCurrentWeekday = this.getCurrentWeekday.bind(this);
  }

  componentDidMount() {
    fetch('/api/list')
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(`Error: ${err}`));
  }

  getCurrentWeekday(targetDate) {
    let date;
    if (targetDate) {
      date = new Date(targetDate);
    } else {
      date = new Date();
    }
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date).toLowerCase();
  }

  render() {
    const userData = this.state.data;
    if (!userData[0]) return null;
    const currentDate = this.getCurrentWeekday();
    return (
      <div>
        <ListHeader weekday={currentDate} />
        <DailyList weekday={userData.filter(element => this.getCurrentWeekday(element.eatenAt) === currentDate)} />
      </div>
    );
  }
}
