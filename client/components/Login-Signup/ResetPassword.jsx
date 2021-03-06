import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class ResetPassword extends Component {
	state = {
	  username: '',
	  password: '',
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
	  const { password, oldtwo, newPassword, p1Displayed, p2Displayed, newDisplayed } = this.state

	  if (e.target.name === 'password') {
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
	    } else if (!password || !oldtwo) {
	      this.setState({ errorMessage: 'Enter your password' })
	    } else if ((password && oldtwo) && (password !== oldtwo)) {
	      this.setState({
	        errorMessage: 'Passwords do not match.'
	      })
	    } else if ((password && oldtwo) && (password === oldtwo)) {
	      this.checkOldPassword()
	    }
	  } else if (e.target.name === 'finalSubmit') {
	    if (!newPassword) {
	      this.setState({
	        errorMessage: 'Enter a new password.'
	      })
	    }
	    if (newPassword === password) {
	      this.setState({
	        errorMessage: 'New password must be different.'
	      })
	    }
	    if (newPassword && newPassword !== password) {
	      this.setNewPassword()
	    }
	  }
	}

	checkOldPassword = async () => {
	  const { username, password } = this.state
	  const usernameData = {
	    username, password
	  }
	  const init = {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(usernameData)
	  }
	  const checkRes = await fetch('/api/check', init)
	  const checkJSON = await checkRes.json()
	  if (checkJSON.success) {
	    this.setState({ newPasswordModalDisplay: true })
	  } else if (checkJSON.error) {
	    this.setState({ error: checkJSON.error })
	  }
	}

	setNewPassword = async () => {
	  const { username, newPassword } = this.state
	  const usernameData = { username, newPassword }
	  const init = {
	    method: 'POST',
	    header: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(usernameData)
	  }
	  const setNewRes = await fetch('/api/setNew', init)
	  const setNewJSON = await setNewRes.json()
	  if (setNewJSON.success) {
	    this.setState({ success: true })
	  } else if (setNewJSON.error) {
	    this.setState({ error: setNewJSON.error })
	  }
	}

	render() {
	  return (
	    <Container>
	      {
	        this.state.newPasswordModalDisplay
	          ? <div className='newPasswordContainer'>
					  <h2>Enter yo new password here!</h2>
					  <form className='form'>
					    <div className='formSection'>
					      <label className='label' htmlFor='newPassword'>New Password:</label>
					      <input className='input' name='newPassword' onFocus={this.handleOnFocus} onChange={this.handleChange} value={this.state.newPassword} type={this.state.newDisplayed ? 'text' : 'password'} />
					      <button onClick={this.handleClick} className='passwordDisplay' name='newPassword'>{this.state.newDisplayed ? 'Hide' : 'Show'}</button>
					    </div>
	              {
	                this.state.errorMessage
	                  ? <h2>{ this.state.errorMessage }</h2>
	                  : <div className='buttonContainer'>
	                    <button onClick={this.handleClick} name='finalSubmit' className='button'>Submit</button>
	                    <Link to='/login' className='link'>Return</Link>
	                  </div>
	              }
					  </form>
	          </div>
	          : <div className='newPasswordContainer'>
	            <h2>Enter yo old password here!</h2>
	            <form className='form'>
	              <div className='formSection'>
	                <label className='label' htmlFor='username'>Username: </label>
	                <input className='input' onChange={this.handleChange} onFocus={this.handleOnFocus} name='username' value={this.state.username} type='text' />
	              </div>
	              <div className='formSection'>
	                <label className='label' htmlFor='password'>Old Password: </label>
	                <input className='input' onChange={this.handleChange} onFocus={this.handleOnFocus} name='password' value={this.state.password} type={this.state.p1Displayed ? 'text' : 'password'} />
	                <button className='passwordDisplay' onClick={this.handleClick} name='password'>{this.state.p1Displayed ? 'Hide' : 'Show' }</button>
	              </div>
	              <div className='formSection'>
	                <label className='label' htmlFor='oldtwo'>Old Password: </label>
	                <input className='input' onChange={this.handleChange} onFocus={this.handleOnFocus} name='oldtwo' value={this.state.oldtwo} type={this.state.p2Displayed ? 'text' : 'password'} />
	                <button className='passwordDisplay' onClick={this.handleClick} name='oldtwo'>{this.state.p2Displayed ? 'Hide' : 'Show' }</button>
	              </div>
	              {
	                this.state.errorMessage
	                  ? <div>{ this.state.errorMessage }</div>
	                  : <div className='buttonContainer'>
	                    <button onClick={this.handleClick} name='submit'>Submit</button>
	                    <button>Return</button>
	                    <Link to='/login' className=''>Return</Link>
	                  </div>
	              }
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
	.newPasswordContainer {
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
	.form {
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}
	.formSection {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 6px 0;
		position: relative;
	}
	.label {
		width: 24%;
		text-align: right;
		margin-right: 6px;
	}
	.input {
		width: 70%;
	}
	.passwordDisplay {
		position: absolute;
		right: 8px;
		bottom: 1px;
	}
`
