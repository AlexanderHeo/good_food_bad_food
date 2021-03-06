import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'

class ResetPassword extends Component {
	state = {
	  password: '',
	  reenter: '',
	  newPassword: '',
	  p1Displayed: false,
	  p2Displayed: false,
	  newDisplayed: false,
	  errorMessage: '',
	  newPasswordModalDisplay: false,
	  success: false
	}

	handleChange = e => {
	  this.setState({ [e.target.name]: e.target.value })
	}

	handleOnFocus = () => {
	  this.setState({ errorMessage: '' })
	}

	handleClick = e => {
	  e.preventDefault()
	  const { password, reenter, newPassword, p1Displayed, p2Displayed, newDisplayed } = this.state

	  if (e.target.name === 'password') {
	    this.setState({ p1Displayed: !p1Displayed })
	  } else if (e.target.name === 'reenter') {
	    this.setState({ p2Displayed: !p2Displayed })
	  } else if (e.target.name === 'newPassword') {
	    this.setState({ newDisplayed: !newDisplayed })
	  } else if (e.target.name === 'submit') {
	    if (!password || !reenter) {
	      this.setState({ errorMessage: 'Enter your password' })
	    } else if ((password && reenter) && (password !== reenter)) {
	      this.setState({
	        errorMessage: 'Passwords do not match.'
	      })
	    } else if ((password && reenter) && (password === reenter)) {
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
	  const { password } = this.state
	  const userData = {
	    userId: this.props.location.state.userData.userId, password
	  }
	  const init = {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(userData)
	  }
	  const checkRes = await fetch('/api/check', init)
	  const checkJSON = await checkRes.json()
	  if (checkJSON.success) {
	    this.setState({ newPasswordModalDisplay: true })
	  } else if (checkJSON.error) {
	    this.setState({ error: checkJSON.error })
	  }
	}

	setNewPassword = () => {
	  const { newPassword } = this.state
	  const userId = this.props.location.state.userData.userId
	  const patchData = { userId, newPassword }
	  const init = {
	    method: 'PATCH',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(patchData)
	  }
	  fetch(`/api/reset/${userId}`, init)
	    .then(response => response.json())
	    .then(data => {
	      if (data.success) {
	        this.setState({ success: true })
	      }
	    })
	  // const setNewRes = await fetch(`/api/reset/${userId}`, init)
	  // const setNewJSON = await setNewRes.json()
	  // if (setNewJSON.success) {
	  //   this.setState({ success: true })
	  // } else if (setNewJSON.error) {
	  //   this.setState({ error: setNewJSON.error })
	  // }
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
	                <label className='label' htmlFor='password'>Old Password: </label>
	                <input className='input' onChange={this.handleChange} onFocus={this.handleOnFocus} name='password' value={this.state.password} type={this.state.p1Displayed ? 'text' : 'password'} />
	                <button className='passwordDisplay' onClick={this.handleClick} name='password'>{this.state.p1Displayed ? 'Hide' : 'Show' }</button>
	              </div>
	              <div className='formSection'>
	                <label className='label' htmlFor='reenter'>Old Password: </label>
	                <input className='input' onChange={this.handleChange} onFocus={this.handleOnFocus} name='reenter' value={this.state.reenter} type={this.state.p2Displayed ? 'text' : 'password'} />
	                <button className='passwordDisplay' onClick={this.handleClick} name='reenter'>{this.state.p2Displayed ? 'Hide' : 'Show' }</button>
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
	      {
	        this.state.success &&
					<Redirect to='/login' />
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
