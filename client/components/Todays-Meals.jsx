import React, { Component } from 'react'
import styled from 'styled-components'
import Loader from './Loader'
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
	  ready: false
	}

	componentDidMount() {
	  const { todaysMeals } = this.props
	  const breakfast = todaysMeals.filter(x => x.mealtime === 'b')
	  const lunch = todaysMeals.filter(x => x.mealtime === 'l')
	  const dinner = todaysMeals.filter(x => x.mealtime === 'd')
	  const snacks = todaysMeals.filter(x => x.mealtime === 's')

	  this.setState({
	    breakfast: breakfast[0],
	    lunch: lunch[0],
	    dinner: dinner[0],
	    snacks: snacks[0],
	    ready: true,
	    breakfastReady: true
	  })
	}

	handleMealTimeClick = mealtime => {
	  fetch('/api/enter')
	    .then(response => response.json())
	    .then(result => {
	      // console.log(result)
	    })
	    .catch(err => console.error(err))
	}

	render() {
	  return (
	    <Container>
	      {
	        this.state.ready
	          ? <>
	            {
	              this.state.breakfastReady
	                ? <TodaysMealItem
	                  food={ this.state.breakfast }
	                  mealtime='breakfast' />
	                : <div
	                  onClick={ () => this.handleMealTimeClick('breakfast') }
	                  className='meal mealTime'>Breakfast</div>
	            }
	            {
	              this.state.lunchReady
	                ? <TodaysMealItem
	                  food={ this.state.lunch } />
	                : <div
	                  onClick={ () => this.handleMealTimeClick('lunch') }
	                  className='meal mealTime'>Lunch</div>
	            }
	            {
	              this.state.dinnerReady
	                ? <TodaysMealItem
	                  food={ this.state.dinner } />
	                : <div
	                  onClick={ () => this.handleMealTimeClick('dinner') }
	                  className='meal mealTime'>Dinner</div>
	            }
	            {
	              this.state.snacksReady
	                ? <TodaysMealItem
	                  food={ this.state.snacks } />
	                : <div
	                  onClick={ () => this.handleMealTimeClick('snacks') }
	                  className='meal mealTime'>Snacks</div>
	            }
	          </>
	          : <Loader />
	      }
	    </Container>
	  )
	}
}

export default TodaysMeals

const Container = styled.div`
	width: 100%;
	height: 100%;
	.meal {
		height: 25%;
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
