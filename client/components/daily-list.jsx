import React from 'react';
import { Link } from 'react-router-dom';

export default class DailyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
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

  componentDidMount() {
    fetch('/api/ratefood')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ meals: data });
      })
      .catch(err => {
        alert('Error: ', err);
      });
  }

  render() {
    const targetDate = this.getWeekday();
    const meals = this.state.meals.filter(element => this.getWeekday(element.eatenAt) === targetDate);
    return (
      <div className="effectsBox">
        {
          meals.map(element =>
            <Link to={`/rate/${element.mealId}`} key={element.eatenAt}>
              <p className=""> {element.name}
                <img src={element.image} alt={element.image} />
              </p>
            </Link>
          )
        }
      </div>
    );
  }
}
