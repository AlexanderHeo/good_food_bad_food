import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ReturnChevron } from './Icons';

class Login extends React.Component {
  state = {
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
	    <LoginContainer>
	      <Link
	        to='/ls'
	        className='returnButton'
	      >
	        <ReturnChevron />
	      </Link>
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
	    </LoginContainer>
	  );
	}
}

export default Login;

const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;

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
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form {
		width: 100%;
		height: 80%;
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
`
