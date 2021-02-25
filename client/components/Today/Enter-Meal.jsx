import React, { Component } from 'react'
import styled from 'styled-components'
import RatingSystem from '../Rating/RatingSystem'
import { AddPlus, ReturnChevron } from '../UI/Icons'

class EnterMeal extends Component {
	state = {
	  value: '',
	  vote: '',
	  errorMessage: '',
	  ready: false
	}

	componentDidMount() {
	  const mealtime = this.props.mealtime
	  if (this.props.[mealtime]) {
	    this.setState({ value: this.props.[this.props.mealtime].name })
	  }
	  const ready = `${mealtime}Ready`
	  if (this.props.[ready]) {
	    this.setState({ ready: true })
	  }

	}

	handleButtonClick = e => {
	  e.preventDefault()
	  const name = e.currentTarget.name
	  if (name === 'return') {
	    this.props.handleClick('return')
	  } else if (name === 'add') {
	    if (!this.state.value) {
	      this.setState({
	        errorMessage: 'You need to enter something'
	      })
	    } else {
	      const parameters = {
	        food: this.state.value,
	        mealtime: this.props.mealtime
	      }
	      // this.props.addFood(this.state.value, this.props.mealtime)
	      // this.props.return('return')
	      this.props.addMeal('food', parameters)
	    }
	  } else if (name === 'one' || name === 'two' || name === 'three' || name === 'four' || name === 'five') {
	    this.props.addMeal('report', name)
	  }
	}

	handleInputChange = e => {
	  this.setState({ value: e.target.value })
	}

	handleInputFocus = e => {
	  this.setState({ errorMessage: '' })
	}

	render() {
	  return (
	    <Container>
	      <button name='return' className='returnButton' onClick={ this.handleButtonClick }>
	        <ReturnChevron />
	      </button>
	      <h2 className='mealtime'>{ this.props.mealtime }</h2>
	      <form className='form'>
	        <label></label>
	        <input
	          type='text'
	          placeholder='What did you eat?'
	          className='input'
	          value={ this.state.value }
	          onChange={ this.handleInputChange }
	          onFocus={ e => {
	            this.handleInputFocus()
	          }}/>
	        <button name='add' className='addButton' onClick={ this.handleButtonClick }>
	          <AddPlus />
	        </button>
	      </form>

	      <div className='voteContainer'>
	        {
	          this.state.errorMessage
	          ? <h3 className='errorMessage'>{ this.state.errorMessage }</h3>
	          : this.state.ready
	              ? <RatingSystem handleClick={ this.handleButtonClick } />
	              : null
	      	}
	      </div>
	    </Container>
	  )
	}
}

export default EnterMeal

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--primary-2);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.returnButton, .addButton {
		position: absolute;
		width: 50px;
		height: 50px;
		border: 4px solid var(--primary-6);
		border-radius: 50%;
	}
	.returnButton {
		top: 0;
		left: 0;
		margin: 12px;
	}
	.addButton {
		margin: 0 6px;
	}

	.mealtime {
		width: 100%;
		text-align: center;
	}

	.form {
		margin: 20px 0;
	}
	.input {
		font-size: 1.2rem;
		width: 80%;
		border-radius: 20px;
		padding: 10px 20px;
	}

	.voteContainer {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 50px;
		/* .vote {
			width: 50px;
			height: 50px;
			border: 4px solid var(--primary-6);
			border-radius: 50%;
			background-color: var(--primary-0);
			margin: 0 12px;
		} */
	}

	.errorMessage {
		text-align: center;
		color: var(--warning-5);
		font-weight: 700;
	}
`
