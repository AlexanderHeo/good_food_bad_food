import React, { Component } from 'react'
import styled from 'styled-components'
import RatingsList from './RatingsList'

class Lists extends Component {
	state = {
	  breakfast: [],
	  lunch: [],
	  dinner: [],
	  snacks: []
	}

	componentDidMount() {
	  const breakfast = []
	  const lunch = []
	  const dinner = []
	  const snacks = []
	  const { list } = this.props
	  list.forEach(x => {
	    const { mealtime } = x
	    switch (mealtime) {
	      case 'breakfast':
	        breakfast.push(x)
	        break
	      case 'lunch':
	        lunch.push(x)
	        break
	      case 'dinner':
	        dinner.push(x)
	        break
	      case 'snacks':
	        snacks.push(x)
	        break
	      default:
	        break
	    }
	  })
	  breakfast.sort((a, b) => b.report - a.report)
	  lunch.sort((a, b) => b.report - a.report)
	  dinner.sort((a, b) => b.report - a.report)
	  snacks.sort((a, b) => b.report - a.report)
	  this.setState({
	    breakfast: breakfast,
	    lunch: lunch,
	    dinner: dinner,
	    snacks: snacks
	  })
	}

	render() {
	  const { breakfast, lunch, dinner, snacks } = this.state
	  const list = [
	    { breakfast }, { lunch }, { dinner }, { snacks }
	  ]
	  return (
	    <Container>
	      <div className={ this.props.clicked ? `${'lists'} ${'open'}` : `${'lists'} ${'closed'}`}>
        	<h2 className='listTitle'>Good vs Bad</h2>
	        <section className='listSection'>
          	<RatingsList sortedList={list} />
	        </section>
	        <div className='buttonContainer'>
	          <button name='list' className='button' onClick={this.props.handleClick}>Return</button>
	        </div>
	      </div>
	    </Container>
	  )
	}
}

export default Lists

const Container = styled.div`
	width: 100vw;
	height: calc(100vh - 80px);
	background-color: var(--gray-9);
	.lists {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--primary-1);
		transform: translateY(1000px);
	}
	.lists.open {
		animation: slideUp 0.3s forwards;
	}
	.lists.closed {
		animation: slideDown 0.3s forwards;
	}
	.listTitle {
		margin: 12px 0;
	}
	.listSection {
		width: 80%;
	}
`
