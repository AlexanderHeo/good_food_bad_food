import React from 'react';
import { Link } from 'react-router-dom';

export default class DailyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
  }

  getWeekday() {
    const date = new Date();
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
      <div className="d-flex">
        {
          meals.map(element =>
            <Link to={`/rate/${element.mealId}`} key={element.eatenAt}>
              <p className="h3"> {element.name}
                <img src={element.image} alt={element.image} />
              </p>
            </Link>
          )
        }
      </div>
    );
  }
}

