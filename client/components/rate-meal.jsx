import React from 'react';
// import SingleMeal from './single-meal'

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
    this.getMeals()
  }

  getMeals(){
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
    if (this.state.meals.length === 0){
      return null
    } else {
      if (this.state.rateFood === false) {
        const allMeals = this.state.meals
        console.log("meal state in render: ", allMeals)
        allMeals.map(mealObject => {
        console.log(mealObject)
        })
        return (
          <div className={'container'} style={{ width: '375px', height: '667px' }}>
            <div className={'enterEffectDiv'}></div>
            <div className={'bg-primary'}>Choose the food you want to enter effect for:</div>
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleFoodClick}>Pizza
              <img src='./images/badFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleFoodClick}>Hot Dog
              <img src='./images/happyFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleFoodClick}>Hamburger
              <img src='./images/happyFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleFoodClick}>Salad
              <img src='./images/neutralFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleFoodClick}>Hot Wings
              <img src='./images/neutralFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
              </a>
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
