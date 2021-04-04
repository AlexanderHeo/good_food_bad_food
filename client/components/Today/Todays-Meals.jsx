import React, { Component } from 'react';
import styled from 'styled-components';
import EnterMeal from './Enter-Meal';
import TodaysMealItem from './Todays-Meal-Item';

class TodaysMeals extends Component {
  state = {
    enterModalDisplayed: false,
    enteringFor: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    breakfastReady: false,
    lunchReady: false,
    dinnerReady: false,
    snacksReady: false,
    slideIn: false
  };

  componentDidMount() {
    this.separateMealTime();
    this.slideIn();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateDisplay !== this.props.dateDisplay) {
      this.separateMealTime();
      this.setState({ slideIn: false });
      this.slideIn();
    }
    if (prevProps.list !== this.props.list) {
      this.separateMealTime();
    }
  }

  slideIn = () => {
    setTimeout(() => {
      this.setState({ slideIn: true });
    }, 300);
  };

  separateMealTime = () => {
    const displayDay = this.props.list.filter((x) => {
      const e = new Date(x.eatenAt);
      const eY = e.getFullYear();
      let eM = e.getMonth() + 1;
      if (eM.toString().length === 1) eM = `0${eM}`;
      let eD = e.getDate();
      if (eD.toString().length === 1) eD = `0${eD}`;
      const eatenDate = `${eY}-${eM}-${eD}`;
      if (this.props.dateDisplay.fullDate === eatenDate) {
        return x;
      }
    });
    this.setState({
      enterModalDisplayed: false,
      enteringFor: '',
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: '',
      breakfastReady: false,
      lunchReady: false,
      dinnerReady: false,
      snacksReady: false
    });
    displayDay.map((x) => {
      const ready = `${x.mealtime}Ready`;
      this.setState({
        [x.mealtime]: x,
        [ready]: true
      });
    });
  };

  handleClick = (action, parameter) => {
    if (action === 'enter') {
      this.setState({
        enterModalDisplayed: true,
        enteringFor: parameter
      });
    } else if (action === 'return') {
      this.setState({
        enterModalDisplayed: false,
        enteringFor: ''
      });
    }
  };

  render() {
    let TodayDisplay = (
      <div className={this.state.slideIn ? 'slideDisplay slideIn' : 'slideDisplay'}>
        {this.state.breakfastReady ? (
          <TodaysMealItem
            food={this.state.breakfast}
            mealtime="breakfast"
            handleClick={this.handleClick}
          />
        ) : (
          <button onClick={() => this.handleClick('enter', 'breakfast')} className="meal mealTime">
            Breakfast
          </button>
        )}
        {this.state.lunchReady ? (
          <TodaysMealItem food={this.state.lunch} mealtime="lunch" handleClick={this.handleClick} />
        ) : (
          <button onClick={() => this.handleClick('enter', 'lunch')} className="meal mealTime">
            Lunch
          </button>
        )}
        {this.state.dinnerReady ? (
          <TodaysMealItem
            food={this.state.dinner}
            mealtime="dinner"
            handleClick={this.handleClick}
          />
        ) : (
          <button onClick={() => this.handleClick('enter', 'dinner')} className="meal mealTime">
            Dinner
          </button>
        )}
        {this.state.snacksReady ? (
          <TodaysMealItem
            food={this.state.snacks}
            mealtime="snacks"
            handleClick={this.handleClick}
          />
        ) : (
          <button onClick={() => this.handleClick('enter', 'snacks')} className="meal mealTime">
            Snacks
          </button>
        )}
      </div>
    );
    if (this.state.enterModalDisplayed) {
      TodayDisplay = (
        <EnterMeal
          mealtime={this.state.enteringFor}
          breakfast={this.state.breakfast}
          lunch={this.state.lunch}
          dinner={this.state.dinner}
          snacks={this.state.snacks}
          breakfastReady={this.state.breakfastReady}
          lunchReady={this.state.lunchReady}
          dinnerReady={this.state.dinnerReady}
          snacksReady={this.state.snacksReady}
          handleClick={this.handleClick}
          addMeal={this.props.addMeal}
          todaysDate={this.props.todaysDate}
          dateDisplay={this.props.dateDisplay}
          userData={this.props.userData}
        />
      );
    }

    return <Container>{TodayDisplay}</Container>;
  }
}

export default TodaysMeals;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .meal {
    height: 25%;
    width: 100%;
    outline: none;
    border: none;
    color: var(--primary-6);
    display: flex;
    align-items: center;
  }
  .meal:nth-child(even) {
    background-color: var(--primary-1);
  }
  .meal:nth-child(odd) {
    background-color: var(--primary-0);
  }
  .meal:first-of-type {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
  .meal:last-of-type {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .mealTime {
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
