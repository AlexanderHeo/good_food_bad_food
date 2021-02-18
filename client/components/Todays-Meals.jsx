import React, { Component } from 'react'
import styled from 'styled-components'

class TodaysMeals extends Component {
	state = {
	  breakfastReady: false,
	  lunchReady: false,
	  dinnerReady: false,
	  snackReady: false,
	  breakfast: [],
	  lunch: [],
	  dinner: [],
	  snacks: [],
	  ready: false
	}

	componentDidMount() {
	  const { todaysMeals } = this.props
	  const breakfast = todaysMeals.filter(x => x.mealtime === 'breakfast')
	  const lunch = todaysMeals.filter(x => x.mealtime === 'lunch')
	  const dinner = todaysMeals.filter(x => x.mealtime === 'dinner')
	  const snacks = todaysMeals.filter(x => x.mealtime === 'snacks')

	  this.setState({
	    breakfastReady: true,
	    lunchReady: true,
	    dinnerReady: true,
	    snackReady: true,
	    breakfast: breakfast,
	    lunch: lunch,
	    dinner: dinner,
	    snacks: snacks,
	    ready: true
	  })

	}

	render() {
	  return (
	    <Container>
	      {
	        this.state.ready
	          ? <>
	            <div className='breakfast meal'>
	              <span className='mealName' >Breakfast:</span>
	              {
	                this.state.breakfastReady
	                  ? <span>{ this.state.breakfast[0].name }</span>
	                  : null
	              }
	              <span className='mealRating' ><div></div></span>
	            </div>
	            <div className='lunch meal' >
	              <span className='mealName' >Lunch</span>
	              {
	                this.state.lunchReady
	                  ? <span>{ this.state.lunch[0].name }</span>
	                  : null
	              }
	              <span className='mealRating' ><div></div></span>
	            </div>
	            <div className='dinner meal' >
	              <span className='mealName' >Dinner</span>
	              {
	                this.state.dinnerReady
	                  ? <span>{ this.state.dinner[0].name }</span>
	                  : null
	              }
	              <span className='mealRating' ><div></div></span>
	            </div>
	            <div className='snacks meal' >
	              <span className='mealName' >Snacks</span>
	              {
	                this.state.snacksReady
	                  ? <span>{ this.state.snacks[0].name }</span>
	                  : null
	              }
	              <span className='mealRating' ><div></div></span>
	            </div>
	          </>
	          : null
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
		.mealName {
			width: 50%;
			margin-left: 20px;
			display: flex;
			justify-content: center;
		}
		.mealRating {
			width: 50%;
			display: flex;
			justify-content: center;
			div {
				width: 20px;
				height: 20px;
				border: 10px solid red;
				border-radius: 50px;
			}
		}
	}
	.meal:nth-child(even) {
		background-color: var(--primary-1);
	}
	.meal:nth-child(odd) {
		background-color: var(--primary-0);
	}
`
