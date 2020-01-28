
import React from 'react';
// import SingleMeal from './single-meal'
import DailyList from './daily-list';

export default class RateMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rateFood: false,
      meals: []
    };
    this.handleFoodClick = this.handleFoodClick.bind(this);
    this.handleRatingClick = this.handleRatingClick.bind(this);
  }

  handleFoodClick() {
    this.setState({ rateFood: true });
  }

  handleRatingClick() {
    this.setState({ rateFood: false });
  }

  componentDidMount() {
    fetch('/api/ratefood')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ meals: data });
        // console.log('meals: ', this.state.meals);
      })
      .catch(err => {
        alert('Error: ', err);
      });
  }

  render() {
    if (this.state.meals.length === 0) {
      return null;
    } else {
      if (this.state.rateFood === false) {
        const allMeals = this.state.meals;
        return (
          <div className="container">

            <div className="row">
              <h1 className="header">
                <span>Enter Effect</span>
              </h1>
            </div>
            <div className="effectLabel">
              <span>
                Choose the meal you want to enter effect for:
              </span>
            </div>

            <div className="effectBox">
              <DailyList weekday={allMeals} onClick={this.handleFoodClick} />
            </div>
            <div className="enterButtons justify-content-around mt-3">
              <button className="halfButton">Done</button>
              <button className="halfButton">Cancel</button>
            </div>
          </div>
        );
      } else if (this.state.rateFood === true) {
        return (
          <div className={'container'} style={{ width: '375px', height: '667px' }}>
            <div className={'bg-warning'}>How did it make you feel?</div>
            <div className={'bg-info'}>FOOD ITEM NAME</div>
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleRatingClick}>Good
                <img src='./images/happyFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleRatingClick}>Ok
                <img src='./images/neutralFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleRatingClick}>Bad
                <img src='./images/badFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
            </div>
          </div>
        );
      }
    }
  }

}
