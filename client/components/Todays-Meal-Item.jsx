import React from 'react'
import styled from 'styled-components'

const TodaysMealItem = props => {
  return (
    <>
      <Container className="meal">
        <div className='mealName'>
        	<span>{ props.mealtime }:</span>
        </div>
        <div className='foodItems'>
          <span>{ props.food.name }</span>
        </div>
        <div className='mealRating'>
        	<span>{ props.food.report }</span>
        </div>
      </Container>
    </>
  )
}

export default TodaysMealItem

const Container = styled.div`
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
