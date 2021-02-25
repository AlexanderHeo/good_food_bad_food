import React, { Component } from 'react'
import styled from 'styled-components'
import EnterMeal from './Enter-Meal'
import TodaysMealItem from './Todays-Meal-Item'

class TodaysMeals extends Component {
	state = {
	  enterModalDisplayed: false,
	  enteringFor: ''
	}

	componentDidMount() {

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
	      const listCopy = [...this.props.list]
	      listCopy.push(result.rows[0])
	      this.props.updateList(listCopy)
	      this.setState({
	        [mealtime]: result.rows[0],
	        [ready]: true
	      })
	    })
	}

	addResult = (food, result) => {
	  const mealId = food.mealId
	  let report
	  if (result === 'upVote') report = 3
	  else if (result === 'downVote') report = 1

	  const mealResult = {
	    mealId, report
	  }
	  fetch(`/api/rate/${mealId}`, {
	    method: 'PATCH',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(mealResult)
	  })
	    .then(response => response.json())
	    .then(data => {
	      const listCopy = [...this.props.list]
	      for (let i = 0; i < listCopy.length; i++) {
	      	if (listCopy[i].mealId === mealId) {
	          listCopy[i].report = report
	          this.props.updateList(listCopy)
	          this.setState({
	            enterModalDisplayed: false,
	            enterFor: '',
	            listLoaded: true
	          })
	        }
	      }
	    })
	}

	render() {
	  let TodayDisplay
	  this.state.enterModalDisplayed
	    ? TodayDisplay = (
	      <EnterMeal
	      mealtime={ this.state.enteringFor }
	      breakfast={ this.props.breakfast }
	      lunch={ this.props.lunch }
	      dinner={ this.props.dinner }
	      snacks={ this.props.snacks }
	      breakfastReady={ this.props.breakfastReady }
	      lunchReady={ this.props.lunchReady }
	      dinnerReady={ this.props.dinnerReady }
	      snacksReady={ this.props.snacksReady }
	      handleClick={ this.handleClick }
	      addMeal={ this.props.addMeal }
	    />
	    )
	    : TodayDisplay = (
	      <>
	      {
	        this.props.breakfastReady
	          ? <TodaysMealItem
	            food={ this.props.breakfast }
	            mealtime='breakfast'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'breakfast') }
	            className='meal mealTime'
	          >Breakfast</button>
	      }
	      {
	        this.props.lunchReady
	          ? <TodaysMealItem
	            food={ this.props.lunch }
	            mealtime='lunch'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'lunch') }
	            className='meal mealTime'
	          >Lunch</button>
	      }
	      {
	        this.props.dinnerReady
	          ? <TodaysMealItem
	            food={ this.props.dinner }
	            mealtime='dinner'
	            handleClick={ this.handleClick }
	          />
	          : <button
	            onClick={ () => this.handleClick('enter', 'dinner') }
	            className='meal mealTime'
	          >Dinner</button>
	      }
	      {
	        this.props.snacksReady
	          ? <TodaysMealItem
	            food={ this.props.snacks }
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
