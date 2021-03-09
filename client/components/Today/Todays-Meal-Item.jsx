import React from 'react'
import styled from 'styled-components'
import RatingDisplay from '../Rating/RatingDisplay'

const TodaysMealItem = props => {
  return (
    <Container
      onClick={ () => props.handleClick('enter', props.mealtime)}
      className="meal">
      <div className='mealName'>
        <span>{ props.mealtime }:</span>
      </div>
      <div className='foodItems'>
        <span>{ props.food.name }</span>
      </div>
      <div className='mealRating'>
        <RatingDisplay rating={ props.food.report } />
      </div>
    </Container>
  )
}

export default TodaysMealItem

const Container = styled.button`
	.mealName, .foodItems, .mealRating {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mealName {
		width: 20%;
	}
	.foodItems {
		width: 60%;
	}
	.mealRating {
		width: 20%;
	}
`
