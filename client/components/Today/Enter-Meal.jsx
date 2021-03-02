import React, { Component } from 'react'
import styled from 'styled-components'
import RatingSystem from '../Rating/RatingSystem'

class EnterMeal extends Component {
	state = {
	  food: {},
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
	  if (this.props[ready]) {
	    this.setState({
	      previousValue: this.props[this.props.mealtime].name,
	      value: this.props[this.props.mealtime].name,
	      food: this.props[mealtime],
	      rating: this.props[this.props.mealtime].report
	    })
	  } else if (!this.props[ready]) {
	    this.nameInput.focus()
	  }
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevState.editName !== this.state.editName) {
	  	this.nameInput.focus()
	  }
	}

	handleButtonClick = e => {
	  e.preventDefault()
	  const name = e.currentTarget.name
	  if (name === 'return') { // return back to Today screen
	    this.props.handleClick('return')
	    // rating is clicked
	  } else if (name === '1' || name === '2' || name === '3' || name === '4' || name === '5') {
	    this.setState({
	      rating: name,
	      errorMessage: ''
	    })
	  } else if (name === 'editName') { // edited name
	    this.setState({ editName: true })
	  } else if (name === 'add') { // clicked plus button
	    if (!this.state.value) { // if input invalid
	      this.setState({ errorMessage: 'You need to enter something' })
	    } else { // if input valid
	      if (!this.props[`${this.props.mealtime}Ready`]) { // adding new name
	        const parameters = {
	          meal: this.state.value,
	          mealtime: this.props.mealtime,
	          isToday: this.state.isToday,
	          enterDate: this.props.dateDisplay
	        }
	        this.props.addMeal('food', parameters)
	        this.props.handleClick('return')
	      } else { // patching name
	        if (!this.state.rating) { // if rating invalid
	          this.setState({ errorMessage: 'You need to enter a rating' })
	        } else { // if rating valid
	          // name edited and add rating
	          if (this.state.previousValue !== this.state.value) {
	            const foodCopy = Object.assign({}, this.state.food)
	            foodCopy.name = this.state.value
	            foodCopy.report = this.state.rating
	            const namePatchData = {
	              food: foodCopy,
	              mealtime: this.props.mealtime
	            }
	            const ratingData = {
	              food: foodCopy,
	              rating: this.state.rating
	            }
	            this.props.addMeal('foodPatch', namePatchData)
	            this.props.addMeal('rating', ratingData)
	            this.props.handleClick('return')
	            // name not edited add rating
	          } else if (this.state.previousValue === this.state.value) {
	            const foodCopy = Object.assign({}, this.state.food)
	            foodCopy.report = this.state.rating
	            const parameters = {
	              food: foodCopy
	            }
	            this.props.addMeal('rating', parameters)
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

	render() {
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
						<RatingSystem
						  handleClick={ this.handleButtonClick }
						  rating={ this.state.rating }
						/>
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
