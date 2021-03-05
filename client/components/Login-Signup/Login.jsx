import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

class Login extends React.Component {
  state = {
    showModal: false,
    username: '',
    password: '',
    usernameFocused: false,
    passwordFocused: false,
    isLoggedIn: false,
    errorMessage: '',
    pwErrorMessage: ''
  };

  handleButtonClick = e => {
    e.preventDefault()
    if (!this.state.username) {
      this.setState({ errorMessage: 'Please enter username' })
    } else if (!this.state.password) {
      this.setState({ errorMessage: 'Please enter password' })
    } else {
      this.loginAccount()
    }
  }

  loginAccount = () => {
    const goodStuff = {
      username: this.state.username,
      password: this.state.password
    };
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goodStuff)
    };

    fetch('/api/log-in', init)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ pwErrorMessage: result.error });
        }
      })
      .catch(err => console.error(err));
  }

  handleChange = event => {
    const type = event.target.name
    const value = event.target.value
    if (type === 'username') {
      this.setState({
        username: value,
        errorMessage: '',
        pwErrorMessage: ''
      })
    } else if (type === 'password') {
      this.setState({
        password: value,
        errorMessage: '',
        pwErrorMessage: ''
      });
    }
  }

	handleOnFocus = e => {
	  const focused = `${e.target.name}Focused`
	  this.setState({
	    errorMessage: '',
	    [focused]: true
	  })
	}

	render() {
	  return (
	    <>
	      {
	        this.state.showModal &&
					<IntroModal>
					  <div className='container'>
					    <h3>Good Food Bad Food</h3>
					    <div className='text'>This is a food tracker app. There are a lot of folks that needs to watch what they eat for many reasons - disease, allergy, diet, preference, religious restrictions, and other reasons.</div>
					    <div className='text'>If you want to create a new account to track your meals, please feel free! Contact me, in the about page in settings, if you find a bug.</div>
					    <div className='text'>If you just want to test the app, use the following info to see an active acount you can play around with.</div>
					    <div className='user'>username=alex</div>
					    <div className='user'>password=alex</div>
					  </div>
					  <button
					    className='modalButton'
					    onClick={() => this.setState({ showModal: false })}
					  > Gotcha</button>
					</IntroModal>
	      }

	      <LoginContainer>
	        <h1 className="title">Log In</h1>
	        <form
	          className="form"
	        >
	          <fieldset className="fieldset">
	            <label className="label">Username:</label>
	            <input
	              className="input"
	              type="text"
	              name="username"
	              required={ this.state.usernameFocused }
	              value={ this.state.username }
	              placeholder=''
	              onChange={ this.handleChange }
	              onFocus={ this.handleOnFocus } />
	          </fieldset>
	          <fieldset className="fieldset">
	            <label className="label">Password:</label>
	            <input
	              className="input"
	              type="password"
	              name="password"
	              required={ this.state.passwordFocused }
	              value={ this.state.password }
	              placeholder=''
	              onChange={ this.handleChange }
	              onFocus={ this.handleOnFocus } />
	          </fieldset>
	          {
	            this.state.isLoggedIn
	              ? <Redirect from='/login' to={{ pathname: 'home', state: { username: this.state.username } }}/>
	              : null
	          }
	          {
	            this.state.errorMessage
	              ? <div className="errorMessage">{ this.state.errorMessage }</div>
	              : this.state.pwErrorMessage
	                ? <div className="errorMessage">{ this.state.pwErrorMessage }</div>
	                : <div className="button-container">
	                  <button
	                    className="button"
	                    onClick={ this.handleButtonClick }>Log In</button>
	                </div>
	          }

	        </form>
	        <div className='linkContainer'>
	          <Link
	            to='/reset'
	            className='link'
	          >reset password</Link>
	          <Link
	            to='/signup'
	            className='link'
	          >signup</Link>
	        </div>
	      </LoginContainer>
	    </>
	  );
	}
}

export default Login;

const IntroModal = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: hsla(0, 0%, 0%, 0.75);
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 1000;

	.container {
		width: 100%;
		margin: 0 12px;
		background-color: var(--primary-0);
		padding: 36px 18px;
		border-radius: 12px;
		.text {
			font-size: 1.2rem;
			font-weight: 500;
			margin: 36px 0;
		}
		.text:nth-of-type(3) {
			margin: 36px 0 0 0;
		}
		.user {
			font-size: 1.3rem;
			text-align: center;
			font-weight: 700;
		}
		.user {
			margin-top: 24px;
		}
		.user:last-of-type {
			margin: 0;
		}
	}
	.modalButton {
		padding: 12px 24px;
		background-color: var(--primary-0);
		border-radius: 12px;
		margin-top: 10px;
		font-size: 1.4rem;
		color: var(--primary-6);
	}
`

const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	.returnButton {
		width: 50px;
		height: 50px;
		border: 4px solid var(--primary-6);
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		margin: 12px;
		padding-left: 6px;
	}

	.title {
		width: 100%;
		text-align: center;
		margin-top: 55%;
	}

	.form {
		padding: 0 20px;
		text-align: center;

		.fieldset {
			padding: 10px 0;
			margin: 10px 0;
		}
		.fieldset:last-of-type {
			margin-bottom: 50px;
		}

		.label, .input {
			font-size: 1.3rem;
			font-weight: 700;
		}
		.label {
			width: 30%;
			text-align: right;
		}
		.input {
			width: 60%;
			outline: none;
			border-radius: 16px;
			padding: 6px 6px;
			margin: 0 12px;
			text-align: center;
			background-color: var(--primary-0);
			box-shadow: 0 0 0 transparent;
		}
		.input:invalid {
			box-shadow: 0 0 3px 3px var(--warning-4);
		}

		.button-container {
			margin-top: 36px;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.button {
				width: 90%;
				margin: 10px 0;
			}
		}
		.errorMessage {
			width: calc(100% - 40px);
			position: absolute;
			font-size: 1.5rem;
			color: var(--warning-4);
			font-weight: 700;
		}
	}

	.linkContainer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		margin-bottom: 24px;
		.link {
			font-size: 0.8rem;
			text-decoration: underline;
			margin: 0 36px;
		}
	}
`
