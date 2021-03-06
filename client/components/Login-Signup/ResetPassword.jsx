import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class ResetPassword extends Component {
	state = {
	  username: '',
	  oldone: '',
	  oldtwo: '',
	  newPassword: '',
	  p1Displayed: false,
	  p2Displayed: false,
	  newDisplayed: false,
	  errorMessage: '',
	  newPasswordModalDisplay: false
	}

	handleChange = e => {
	  this.setState({ [e.target.name]: e.target.value })
	}

	handleOnFocus = () => {
	  this.setState({ errorMessage: '' })
	}

	handleClick = e => {
	  e.preventDefault()
	  const { oldone, oldtwo, newPassword, p1Displayed, p2Displayed, newDisplayed } = this.state

	  if (e.target.name === 'oldone') {
	    this.setState({ p1Displayed: !p1Displayed })
	  } else if (e.target.name === 'oldtwo') {
	    this.setState({ p2Displayed: !p2Displayed })
	  } else if (e.target.name === 'newPassword') {
	    this.setState({ newDisplayed: !newDisplayed })
	  } else if (e.target.name === 'submit') {
	    if (!this.state.username) {
	      this.setState({
	        errorMessage: 'Please enter your username.'
	      })
	    } else if (!oldone || !oldtwo) {
	      this.setState({ errorMessage: 'Enter your password' })
	    } else if ((oldone && oldtwo) && (oldone !== oldtwo)) {
	      this.setState({
	        errorMessage: 'Passwords do not match.'
	      })
	    } else if ((oldone && oldtwo) && (oldone === oldtwo)) {
	      this.setState({
	        newPasswordModalDisplay: true
	      })
	    } else if (!newPassword) {
	      this.setState({
	        errorMessage: 'Enter a new password.'
	      })
	    }
	  }
	}

	render() {
	  return (
	    <Container>
	      <form className='form'>
	        <div>
	          <label htmlFor='username'>Username: </label>
	          <input onChange={this.handleChange} onFocus={this.handleOnFocus} name='username' value={this.state.username} type='text' />
	        </div>
	        <div>
	          <label htmlFor='oldone'>Old Password: </label>
	          <input onChange={this.handleChange} onFocus={this.handleOnFocus} name='oldone' value={this.state.oldone} type={this.state.p1Displayed ? 'text' : 'password'} />
	          <button className='passwordDisplay' onClick={this.handleClick} name='oldone'>{this.state.p1Displayed ? 'Hide' : 'Show' }</button>
	        </div>
	        <div>
	          <label htmlFor='oldtwo'>Old Password: </label>
	          <input onChange={this.handleChange} onFocus={this.handleOnFocus} name='oldtwo' value={this.state.oldtwo} type={this.state.p2Displayed ? 'text' : 'password'} />
	          <button className='passwordDisplay' onClick={this.handleClick} name='oldtwo'>{this.state.p2Displayed ? 'Hide' : 'Show' }</button>
	        </div>
	        {
	          this.state.errorMessage
	            ? <div>{ this.state.errorMessage }</div>
	            : <div className='buttonContainer'>
	              <button onClick={this.handleClick} name='submit'>Submit</button>
	              <button>Return</button>
	            </div>
	        }
	      </form>
	      <Link to='/login' className='link'>Return</Link>
	      {
	        this.state.newPasswordModalDisplay &&
					<div className='newPassword'>
					  <h2>Change yo passwords here!</h2>
					  <form className='form'>
					    <div>
					      <label htmlFor='newPassword'>New Password:</label>
					      <input name='newPassword' onFocus={this.handleOnFocus} onChange={this.handleChange} value={this.state.newPassword} type={this.state.newDisplayed ? 'text' : 'password'} />
					      <button onClick={this.handleClick} className='passwordDisplay' name='newPassword'>{this.state.newDisplayed ? 'Hide' : 'Show'}</button>
					    </div>
					    <div className='buttonContainer'>
					      <button onClick={this.handleClick} name='finalSubmit' className='button'>Submit</button>
					    </div>
					  </form>
					</div>
	      }
	    </Container>
	  )
	}
}

export default ResetPassword

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: hotpink;
	border: 5px solid rebeccapurple;
	.message {
		text-align: center;
	}
	.link {
		border: 3px solid rebeccapurple;
		border-radius: 36px;
		padding: 12px 24px;
		font-weight: 700;
		background-color: var(--primary-6);
		color: var(--primary-0);
	}
	.newPassword {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		background-color: var(--primary-0);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`
