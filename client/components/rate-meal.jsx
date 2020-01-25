
import React from 'react';
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
          <div className={'container'} style={{ width: '375px', height: '667px' }}>
            <div className={'enterEffectDiv'}></div>
            <div className={'bg-primary'}>Choose the food you want to enter effect for:</div>
            <div>
              <DailyList weekday={allMeals} onClick={this.handleFoodClick} />
            </div>
            <button className={'.doneButton'} style={{ float: 'left' }}>
              <span>
                Done
              </span>
            </button>
            <button className={'.cancelButton'} style={{ float: 'right' }}>
              <span>
                Cancel
              </span>
            </button>
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
