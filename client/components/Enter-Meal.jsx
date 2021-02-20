import React, { Component } from 'react'
import styled from 'styled-components'

class EnterMeal extends Component {
	state = {
	  value: '',
	  emptyInputErrorMessage: ''
	}

	handleButtonClick = e => {
	  e.preventDefault()
	  if (e.currentTarget.name === 'return') {
	    this.props.return('return')
	  } else if (e.currentTarget.name === 'add') {
	    if (!this.state.value) {
	      this.setState({
	        emptyInputErrorMessage: 'You need to enter something'
	      })
	    } else {
	      this.props.addFood(this.state.value, this.props.mealtime)
	      this.props.return('return')
	    }
	  }
	}

	handleInputChange = e => {
	  this.setState({
	    value: e.target.value
	  })
	}

	handleInputFocus = e => {
	  this.setState({
	    emptyInputErrorMessage: ''
	  })
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
	      {
	        this.state.emptyInputErrorMessage &&
					<h3 className='errorMessage'>{ this.state.emptyInputErrorMessage }</h3>
	      }
	    </Container>
	  )
	}
}

export default EnterMeal

const AddPlus = () => (
  <div className='addBar'>
    <div className='addBar1'></div>
    <div className='addBar2'></div>
  </div>
)

const ReturnChevron = () => (
  <>
    <div className='bar1'></div>
    <div className='bar2'></div>
  </>
)

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

		.bar1, .bar2 {
			width: 4px;
			height: 20px;
			border-radius: 10px;
			background-color: var(--primary-6);
		}
		.bar1 {
			transform: translate(12px, 4.5px) rotate(50deg);
		}
		.bar2 {
			transform: translate(12px, -4.5px) rotate(-50deg);
		}
	}
	.addButton {
		margin: 0 6px;
	.addBar {
		display: flex;
		justify-content: center;
		align-items: center;

		.addBar1, .addBar2 {
			position: absolute;
			top: 0;
			left: 0;
			width: 4px;
			height: 30px;
			border-radius: 10px;
			background-color: var(--primary-6);
		}
		.addBar1 {
			transform: translate(19px, 4px);
		}
		.addBar2 {
			transform: translate(19px, 5px) rotate(90deg);
		}
	}
	}

	.mealtime {
		width: 100%;
		text-align: center;
		margin-bottom: 20px;
	}
	.input {
		font-size: 1.2rem;
		width: 80%;
		border-radius: 20px;
		padding: 10px 20px;
	}

	.errorMessage {
		position: absolute;
		bottom: 10px;
		text-align: center;
		color: var(--warning-5);
		font-weight: 700;
	}
`
