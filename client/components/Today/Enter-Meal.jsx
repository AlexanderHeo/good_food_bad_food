import React, { Component } from 'react'
import styled from 'styled-components'
import RatingSystem from '../Rating/RatingSystem'
import { AddPlus, ReturnChevron } from '../UI/Icons'

class EnterMeal extends Component {
	state = {
	  food: [],
	  value: '',
	  rating: '',
	  errorMessage: '',
	  ready: false,
	  editName: false
	}

	componentDidMount() {

	  const mealtime = this.props.mealtime
	  const ready = `${mealtime}Ready`
	  if (this.props[ready]) {
	    this.setState({
	      value: this.props[this.props.mealtime].name,
	      food: this.props[mealtime]
	    })
	  }

	  // const mealtime = this.props.mealtime
	  // if (this.props.[mealtime]) {
	  //   console.log('first if')
	  //   this.setState({
	  //     value: this.props.[this.props.mealtime].name,
	  //     food: this.props.[mealtime]
	  //   })
	  // }
	  // const ready = `${mealtime}Ready`
	  // if (this.props.[ready]) {
	  //   console.log('second if')
	  //   this.setState({ ready: true })
	  // }
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
	      const foodCopy = Object.assign({}, this.state.food)
	      foodCopy.name = this.state.value
	      const mealReady = `${this.state.food.mealtime}Ready`

	      const parameters = {
	        food: foodCopy,
	        ready: this.props[mealReady],
	        mealtime: this.props.mealtime,
	        enterDate: this.props.todaysDate
	      }
	      this.props.addMeal('food', parameters)
	      this.props.handleClick('return')
	    }
	  } else if (name === '1' || name === '2' || name === '3' || name === '4' || name === '5') {
	    this.setState({ rating: name })
	  } else if (name === 'rating') {
	    if (!this.state.rating) {
	      this.setState({ errorMessage: 'Please pick a rating.' })
	    } else {
	      if (this.state.editName) {
	        const nameParameters = {

	        }
	        this.props.addMeal('patchName', nameParameters)
	      }
	      const parameters = {
	        food: this.state.food,
	        report: this.state.rating
	      }
	      this.props.addMeal('rating', parameters)
	      this.props.handleClick('return')
	    }
	  } else if (name === 'editName') {
	    this.setState({
	      editName: true
	    })
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
	        {
	          this.props[`${this.props.mealtime}Ready`]
	            ? <div className='nameContainer'>

	              {
	                this.state.editName
	                  ? <input
	                    type='text'
	                    placeholder='What did you eat?'
	                    className='input'
	                    value={ this.state.value }
	                    onChange={ this.handleInputChange }
	                    onFocus={ this.handleInputFocus }
	                    style={{ width: '100%' }}
	                  />
	                  : <>
	                    <span className='nameDisplay'>
	                      {this.props.[this.props.mealtime].name}
	                    </span>
	                    <span>
	                      <button
	                        className='iconContainer'
	                        name='editName'
	                        onClick={ this.handleButtonClick }
	                      >
	                        <span className="iconify" data-icon="clarity:note-edit-line" data-inline="false"></span>
	                      </button>
	                    </span>
	                  </>
	              }

	            </div>
	            : <>
	              <input
	                type='text'
	                placeholder='What did you eat?'
	                className='input'
	                value={ this.state.value }
	                onChange={ this.handleInputChange }
	                onFocus={ this.handleInputFocus }
	              />
	              <button
	                name='add'
	                className='addButton'
	                onClick={ this.handleButtonClick }
	              >
	                <AddPlus />
	              </button>
	            </>
	        }
	      </form>

	      <div className='voteContainer'>
	        {
	          this.state.errorMessage
	          ? <h3 className='errorMessage'>{ this.state.errorMessage }</h3>
	          : this.props[`${this.props.mealtime}Ready`]
	              ? <>
	                <RatingSystem handleClick={ this.handleButtonClick } />
	                <button
	                  name='rating'
	                  className='addButton resultAdd'
	                  onClick={ this.handleButtonClick }
	                >
	                  <AddPlus />
	                </button>
	              </>
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
	.resultAdd {
		margin-top: 12px;
		position: relative;
	}

	.mealtime {
		width: 100%;
		text-align: center;
	}

	.form {
		margin: 20px 0;
	}
	svg[data-icon="clarity:note-edit-line"] {
		font-size: 30px;
		color: var(--primary-6);
	}
	.nameContainer {
		display: flex;
		align-items: center;
	}
	.nameDisplay {
		font-size: 2rem;
	}
	.iconContainer {
		width: 50px;
		height: 50px;
		border: 4px solid var(--primary-6);
		border-radius: 50%;
		background-color: var(--primary-0);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10px;
	}
	.input {
		font-size: 1.2rem;
		width: 80%;
		border-radius: 20px;
		padding: 10px 20px;
	}

	.voteContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
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
