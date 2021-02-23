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
      <div className="effectsBox mt-2 d-flex flex-column justify-content-center">
        {
          meals.map(element =>
            <Link to={`/rate/${element.mealId}`} key={element.eatenAt}>
              <div>
                <p className="mt-1 ml-5 float-left"> {element.name}</p>
                <img className="mt-1 mr-5 float-right" src={element.image} alt={element.image} />
              </div>
            </Link>
          )
        }
      </div>
    );
  }
}
