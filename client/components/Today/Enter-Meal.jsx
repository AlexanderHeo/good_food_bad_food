import React, { Component } from 'react'
import styled from 'styled-components'
import RatingSystem from '../Rating/RatingSystem'

class EnterMeal extends Component {
	state = {
	  food: [],
	  value: '',
	  rating: '',
	  errorMessage: '',
	  ready: false,
	  editName: false,
	  isToday: ''
	}

	componentDidMount() {
	  const mealtime = this.props.mealtime
	  const ready = `${mealtime}Ready`
	  // console.log(this.props)
	  this.checkIsItToday()
	  if (this.props[ready]) {
	    this.setState({
	      previousValue: this.props[this.props.mealtime].name,
	      value: this.props[this.props.mealtime].name,
	      food: this.props[mealtime]
	    })
	  } else if (!this.props[ready]) {
	    this.nameInput.focus()
	  }
	}

	componentDidUpdate(prevProps, prevState) {
	  // console.log('cDU')
	  if (prevState.editName !== this.state.editName) {
	  	this.nameInput.focus()
	  }
	  if (prevProps.dateDisplay !== this.props.dateDisplay) {
	    // console.log('new dateDisplay data')
	    this.checkIsItToday()
	  }
	}

	handleButtonClick = e => {
	  e.preventDefault()
	  const name = e.currentTarget.name
	  if (name === 'return') {
	    this.props.handleClick('return')
	  } else if (name === '1' || name === '2' || name === '3' || name === '4' || name === '5') {
	    this.setState({
	      rating: name,
	      errorMessage: ''
	    })
	  } else if (name === 'editName') {
	    this.setState({ editName: true })
	  } else if (name === 'add') {
	    this.checkIsItToday()
	    if (!this.state.value) { // if no input
	      this.setState({ errorMessage: 'You need to enter something' })
	    } else { // input valid
	      if (!this.props[`${this.props.mealtime}Ready`]) { // adding name
	        const parameters = {
	          meal: this.state.value,
	          ready: true,
	          mealtime: this.props.mealtime,
	          enterDate: this.props.todaysDate
	        }
	        this.props.addMeal('food', parameters, this.state.isToday)
	        // console.log('POST new meal', this.state.isToday)
	        this.props.handleClick('return')
	      } else { // patching name
	        if (!this.state.rating) { // check for rating
	          this.setState({ errorMessage: 'You need to enter a rating' })
	        } else { // rating good
	          if (this.state.previousValue !== this.state.value) { // name edited
	            const foodCopy = Object.assign({}, this.state.food)
	            foodCopy.name = this.state.value
	            const mealReady = `${this.state.food.mealtime}Ready`

	            const parameters = {
	              food: foodCopy,
	              ready: this.props[mealReady],
	              mealtime: this.props.mealtime,
	              enterDate: this.props.todaysDate
	            }
	            this.props.addMeal('foodPatch', parameters, this.state.isToday)
	            this.props.addMeal('rating', this.state.rating, this.state.isToday)
	            // console.log('name edited - adding result', this.state.isToday)
	            this.props.handleClick('return')
	          } else if (this.state.previousValue === this.state.value) { // name not edited
	            this.props.addMeal('rating', this.state.rating, this.state.isToday)
	            this.props.handleClick('return')
	          }
	        }
	      }

	    }
	  }
	}

	handleInputChange = e => {
	  this.setState({ value: e.target.value })
	}

	handleInputFocus = e => {
	  this.setState({ errorMessage: '' })
	}

	checkIsItToday = () => {
	  // console.log(new Date(this.props.todaysDate).toTimeString())
	  // console.log(new Date(this.props.dateDisplay.timestamp).toTimeString())
	  // console.log(this.props.todaysDate === this.props.dateDisplay.timestamp)
	  const isToday = this.props.todaysDate === this.props.dateDisplay.timestamp
	  this.setState({ isToday: isToday })
	}

	render() {
	  // console.log('today:', this.state.isToday)
	  return (
	    <Container>
	      <div className='enterHeader'>
	        <button name='return' className='returnButton' onClick={ this.handleButtonClick }>
	          <span className="iconify" data-icon="akar-icons:chevron-left" data-inline="false"></span>
	        </button>
	        <span>
	          <h2 className='mealtime'>{ this.props.mealtime }</h2>
	        </span>
	      </div>
	      <form className='form'>
	        <label></label>
	        {
	          this.props[`${this.props.mealtime}Ready`]
	            ? this.state.editName
	              ? <input
	                type='text'
	                placeholder='What did you eat?'
	                className='input'
	                value={ this.state.value }
	                onChange={ this.handleInputChange }
	                onFocus={ this.handleInputFocus }
	                ref={ input => { this.nameInput = input } }
	              />
	              : <div className='nameContainer'>
	                <span className='nameDisplay'>
	                  {this.props.[this.props.mealtime].name}
	                </span>
	                <button
	                  className='iconContainer'
	                  name='editName'
	                  onClick={ this.handleButtonClick }
	                >
	                  <span className="iconify" data-icon="clarity:note-edit-line" data-inline="false"></span>
	                </button>
	            	</div>
	            : <input
	                type='text'
	                placeholder='What did you eat?'
	                className='input'
	                value={ this.state.value }
	                onChange={ this.handleInputChange }
	                onFocus={ this.handleInputFocus }
	                ref={ input => { this.nameInput = input } }
	              />
	        }
	      </form>
	      <div className='voteContainer'>
	        {
	          this.props[`${this.props.mealtime}Ready`] &&
						<RatingSystem handleClick={ this.handleButtonClick } />
	        }
	        {
	          this.state.errorMessage
	            ? <span className='errorMessage'>{ this.state.errorMessage }</span>
	            : <button
	              name='add'
	              className='addButton'
	              onClick={ this.handleButtonClick }
	            >
	              <span className="iconify" data-icon="akar-icons:plus" data-inline="false"></span>
	            </button>
	        }
	      </div>
	    </Container>
	  )
	}
}

export default EnterMeal

const Container = styled.div`
	height: 100%;
	background-color: var(--primary-2);
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12px 24px;

	.returnButton, .addButton {
		width: 70px;
		height: 40px;
		border: none;
		border-radius: 12px;
	}
	.returnButton {
		position: absolute;
		top: 0;
		left: 0;
		margin: 12px 0 0 24px;
	}
	.addButton {
		position: relative;
		margin-top: 12px;
	}
	svg[data-icon="clarity:note-edit-line"],
	svg[data-icon="akar-icons:plus"],
	svg[data-icon="akar-icons:chevron-left"] {
		font-size: 30px;
		color: var(--primary-6);
	}

	.form {
		width: 100%;
		height: 40%;
		display: flex;
		align-items: center;

		.input {
			font-size: 1.2rem;
			width: 100%;
			outline: none;
			border: 2px solid transparent;
			border-radius: 12px;
			padding: 8px 24px;
		}
		.input:invalid {
			border: 2px solid var(--warning-4);
		}
		.nameContainer {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--primary-0);
			border-radius: 12px;
			padding: 3px 0;
			.nameDisplay {
				font-size: 2rem;
			}
		}
	}

	.iconContainer {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 12px;
		background-color: var(--primary-0);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 30px;
		margin-left: 10px;
	}

	.voteContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.errorMessage {
		text-align: center;
		color: var(--warning-5);
		font-size: 1.3rem;
		font-weight: 700;
	}
`
