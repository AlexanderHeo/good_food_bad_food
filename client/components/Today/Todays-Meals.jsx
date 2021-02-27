import React, { Component } from 'react'
import styled from 'styled-components'
import dateFormatter from '../Functions/Date-Formatter'
import EnterMeal from './Enter-Meal'
import TodaysMealItem from './Todays-Meal-Item'

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
	  snacksReady: false
	}

	componentDidMount() {
	  this.separateMealtime()
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevProps.list !== this.props.list) {
	    this.separateMealtime()
	  }
	  if (prevProps.todaysDate !== this.props.todaysDate) {
	    this.setState({
	      breakfast: '',
	      lunch: '',
	      dinner: '',
	      snacks: '',
	      breakfastReady: false,
	      lunchReady: false,
	      dinnerReady: false,
	      snacksReady: false
	    })
	    this.separateMealtime()
	  }
	}

	separateMealtime = () => {
	  const todaysMeals = this.props.list.filter(x => {
	    const eatenAtDate = new Date(x.eatenAt)
	    const eatenAt = dateFormatter(eatenAtDate)

	    return eatenAt === this.props.todaysDate
	  })
	  todaysMeals.forEach(x => {
	    const mealtime = x.mealtime
	    const ready = `${mealtime}Ready`
	    this.setState({
	      [ready]: true,
	      [mealtime]: x
	    })
	  })
	}

	handleClick = (action, parameter) => {
	  if (action === 'enter') {
	    this.setState({
	      enterModalDisplayed: true,
	      enteringFor: parameter
	    })
	  } else if (action === 'edit') {
	    this.setState({
	      enterModalDisplayed: true,
	      enteringFor: parameter
	    })
	  } else if (action === 'return') {
	    this.setState({
	      enterModalDisplayed: false,
	      enteringFor: ''
	    })
	  }
	}

	render() {
	  let TodayDisplay
	  this.state.enterModalDisplayed
	    ? TodayDisplay = (
	      <EnterMeal
	        mealtime={ this.state.enteringFor }
	        breakfast={ this.state.breakfast }
	        lunch={ this.state.lunch }
	        dinner={ this.state.dinner }
	        snacks={ this.state.snacks }
	        breakfastReady={ this.state.breakfastReady }
	        lunchReady={ this.state.lunchReady }
	        dinnerReady={ this.state.dinnerReady }
	        snacksReady={ this.state.snacksReady }
	        handleClick={ this.handleClick }
	        addMeal={ this.props.addMeal }
	        todaysDate={ this.props.todaysDate }
	    	/>
	    )
	    : TodayDisplay = (
	      <>
	      {
	        this.state.breakfastReady
	          ? <TodaysMealItem
	            food={ this.state.breakfast }
	            mealtime='breakfast'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'breakfast') }
	            className='meal mealTime'
	          >Breakfast</button>
	      }
	      {
	        this.state.lunchReady
	          ? <TodaysMealItem
	            food={ this.state.lunch }
	            mealtime='lunch'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'lunch') }
	            className='meal mealTime'
	          >Lunch</button>
	      }
	      {
	        this.state.dinnerReady
	          ? <TodaysMealItem
	            food={ this.state.dinner }
	            mealtime='dinner'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'dinner') }
	            className='meal mealTime'
	          >Dinner</button>
	      }
	      {
	        this.state.snacksReady
	          ? <TodaysMealItem
	            food={ this.state.snacks }
	            mealtime='snacks'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'snacks') }
	            className='meal mealTime'
	          >Snacks</button>
	      }
	    </>
	    )

	  return (
	    <Container>
	      { TodayDisplay }
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
