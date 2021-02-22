import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
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

  render() {
    return (
      <LoginContainer>
        <h1 className="title">Log In</h1>
        <form
          className="login-form"
        >
          <fieldset className="fieldset">
            <label className="label">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              onChange={ this.handleChange }/>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              onChange={ this.handleChange }/>
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
                  <Link
                    className="button"
                    to="/ls"
                  >Cancel
                  </Link>
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

	.title {
		width: 100%;
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-form {
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
			width: 100%;
			text-align: center;
			font-size: 1.3rem;
			font-weight: 700;
		}
		.input {
			border: 4px solid var(--primary-6);
			border-radius: 16px;
			padding: 6px 6px;
			background-color: var(--primary-0);
		}
		.button-container {
			margin-top: 100px;
		}
		.errorMessage {
			position: absolute;
			font-size: 1.5rem;
			color: var(--warning-4);
			font-weight: 700;
		}
	}
`
