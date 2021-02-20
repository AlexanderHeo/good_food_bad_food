import React, { Component } from 'react'
import styled from 'styled-components'
import EnterMeal from './Enter-Meal'
import TodaysMealItem from './Todays-Meal-Item'

class TodaysMeals extends Component {
	state = {
	  breakfastReady: false,
	  lunchReady: false,
	  dinnerReady: false,
	  snacksReady: false,
	  breakfast: [],
	  lunch: [],
	  dinner: [],
	  snacks: [],
	  ready: false,
	  enterModalDisplayed: false,
	  entering: ''
	}

	componentDidMount() {
	  const { todaysMeals } = this.props
	  const breakfast = todaysMeals.filter(x => x.mealtime === 'breakfast')
	  const lunch = todaysMeals.filter(x => x.mealtime === 'lunch')
	  const dinner = todaysMeals.filter(x => x.mealtime === 'dinner')
	  const snacks = todaysMeals.filter(x => x.mealtime === 'snacks')

	  if (breakfast.length > 0) {
	    this.setState({
	      breakfastReady: true,
	      breakfast: breakfast[0],
	      ready: true
	    })
	  }
	  if (lunch.length > 0) {
	    this.setState({
	      lunchReady: true,
	      lunch: lunch[0],
	      ready: true
	    })
	  }
	  if (dinner.length > 0) {
	    this.setState({
	      dinnerReady: true,
	      dinner: dinner[0],
	      ready: true
	    })
	  }
	  if (snacks.length > 0) {
	    this.setState({
	      snacksReady: true,
	      snacks: snacks[0],
	      ready: true
	    })
	  }
	}

	handleMealTimeClick = mealtime => {
	  if (mealtime === 'return') {
	    this.setState({
	      entering: '',
	      enterModalDisplayed: false
	    })
	  } else {
	    this.setState({
	      entering: mealtime,
	      enterModalDisplayed: true
	    })
	  }
	}

	addFood = (food, mealtime) => {
	  const data = {
	    meal: food,
	    mealtime
	  }
	  fetch('/api/enter', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	  })
	    .then(response => response.json())
	    .then(result => {
	      const ready = `${mealtime}Ready`
	      this.setState({
	        [mealtime]: result.rows[0],
	        [ready]: true
	      })
	    })
	}

	render() {
	  return (
	    <Container>
	      {
	        this.state.breakfastReady
	          ? <TodaysMealItem
	            food={ this.state.breakfast }
	            mealtime='breakfast'
	          />
	          : <button
	            onClick={ () => this.handleMealTimeClick('breakfast') }
	            className='meal mealTime'>Breakfast</button>
	      }
	      {
	        this.state.lunchReady
	          ? <TodaysMealItem
	            food={ this.state.lunch }
	            mealtime='lunch'
	          />
	          : <button
	            onClick={ () => this.handleMealTimeClick('lunch') }
	            className='meal mealTime'>Lunch</button>
	      }
	      {
	        this.state.dinnerReady
	          ? <TodaysMealItem
	            food={ this.state.dinner }
	            mealtime='dinner' />
	          : <button
	            onClick={ () => this.handleMealTimeClick('dinner') }
	            className='meal mealTime'>Dinner</button>
	      }
	      {
	        this.state.snacksReady
	          ? <TodaysMealItem
	            food={ this.state.snacks }
	            mealtime='snacks'
	          />
	          : <button
	            onClick={ () => this.handleMealTimeClick('snacks') }
	            className='meal mealTime'>Snacks</button>
	      }
	      {
	        this.state.enterModalDisplayed &&
	          <EnterMeal
	            mealtime={ this.state.entering }
	            return={ this.handleMealTimeClick }
	            addFood={ this.addFood }
	          />
	      }
	    </Container>
	  )
	}
}

export default TodaysMeals

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
	.mealTime {
		font-size: 1.6rem;
		font-weight: 700;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`
