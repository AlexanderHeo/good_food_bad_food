import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import State from '../Functions/StateChooser';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    city: '',
    state: '',
    usernameFocused: '',
    passwordFocused: '',
    emailFocused: '',
    cityFocused: '',
    stateFocused: '',
    message: '',
    errorMessage: '',
    passCheckMessage:
      'Password must be 7-15 characters, and include at least one (1) special character and one (1) number.',
    invalidSection: '',
    success: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, username, password, city, state } = this.state;
    if (!email) {
      this.setState({
        errorMessage: 'Enter a email address.',
        invalidSection: 'email'
      });
    } else if (!username) {
      this.setState({
        errorMessage: 'Enter a username.',
        invalidSection: 'username'
      });
    } else if (!password) {
      this.setState({
        errorMessage: 'Enter a password.',
        invalidSection: 'password'
      });
    } else if (!city) {
      this.setState({
        errorMessage: 'Enter a city name.',
        invalidSection: 'city'
      });
    } else if (!state) {
      this.setState({
        errorMessage: 'Enter a state name.',
        invalidSection: 'state'
      });
    } else this.createAccount();
  };

  createAccount = async () => {
    const { username, password, city, state } = this.state;

    const usernameCheck = { username };
    const checkInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usernameCheck)
    };
    const response = await fetch('/api/username-check', checkInit);
    const data = await response.json();
    if (data.error) {
      this.setState({
        errorMessage: data.error,
        invalidSection: 'username',
        username: ''
      });
    }
    if (data.success) {
      const userData = { username, password, city, state };
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      };
      const response = await fetch('/api/sign-up', init);
      const data = await response.json();
      if (data.success) {
        this.setState({ success: true });
        this.props.history.push('/login');
      }
      if (data.error) {
        this.setState({
          errorMessage: data.error,
          invalidSection: 'state'
        });
      }
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleFocus = (e) => {
    const name = e.target.name;
    const focused = `${name}Focused`;
    const { invalidSection } = this.state;
    if (name !== 'password' && invalidSection !== 'passCheck') {
      this.setState({
        [focused]: true,
        errorMessage: '',
        invalidSection: ''
      });
    } else if (name === 'password') {
      this.setState({ invalidSection: 'passCheck' });
    }
  };

  handleBlur = (e) => {
    const name = e.target.name;
    if (name === 'password') {
      const { password } = this.state;
      if (password) {
        const passwordRegEx = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
        if (!password.match(passwordRegEx)) {
          this.passwordInput.focus();
          this.setState({
            password: '',
            invalidSection: 'passCheck'
          });
        } else {
          this.setState({ invalidSection: '' });
        }
      } else if (!password) {
        this.passwordInput.focus();
      }
    }
  };

  render() {
    const {
      emailFocused,
      email,
      usernameFocused,
      username,
      passwordFocused,
      password,
      cityFocused,
      city,
      stateFocused,
      success,
      invalidSection
    } = this.state;
    let errorEmail, errorUsername, errorPassword, errorCity, errorState, passCheckPassword;
    switch (invalidSection) {
      case 'email':
        errorEmail = 'invalid';
        break;
      case 'username':
        errorUsername = 'invalid';
        break;
      case 'password':
        errorPassword = 'invalid';
        break;
      case 'city':
        errorCity = 'invalid';
        break;
      case 'state':
        errorState = 'invalid';
        break;
      case 'passCheck':
        passCheckPassword = 'invalid';
        break;
      default:
        break;
    }

    return (
      <Container>
        <h1 className="title">Sign Up</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <fieldset className="fieldset">
            <label className="label">Email:</label>
            <input
              className="input"
              type="email"
              name="email"
              value={email}
              required={emailFocused}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            <div className={`errorMessage ${errorEmail}`}>
              <span>{this.state.errorMessage}</span>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Username:</label>
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              required={usernameFocused}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            <div className={`errorMessage ${errorUsername}`}>
              <span>{this.state.errorMessage}</span>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Password:</label>
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              required={passwordFocused}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={(input) => {
                this.passwordInput = input;
              }}
            />
            <div className={`errorMessage ${errorPassword}`}>
              <span>{this.state.errorMessage}</span>
            </div>
            <div className={`errorMessage passCheckMessage ${passCheckPassword}`}>
              <span>{this.state.passCheckMessage}</span>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">City:</label>
            <input
              className="input"
              type="text"
              name="city"
              value={city}
              required={cityFocused}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            <div className={`errorMessage ${errorCity}`}>
              <span>{this.state.errorMessage}</span>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">State:</label>
            <State
              className="select"
              required={stateFocused}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            <div className={`errorMessage ${errorState}`}>
              <span>{this.state.errorMessage}</span>
            </div>
          </fieldset>
          <div className="buttonContainer">
            <button className="button signup" disabled={this.state.invalidSection}>
              Sign Up
            </button>
          </div>
        </form>
        <div className="linkContainer">
          <Link to="/login" className="link">
            login
          </Link>
        </div>
        {success && (
          <Redirect
            from="/signup"
            to={{
              pathname: 'login',
              state: { username: username }
            }}
          />
        )}
      </Container>
    );
  }
}

export default Signup;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary-0);
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
    margin-top: 20%;
  }
  .form {
    width: 87%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .fieldset {
    padding: 14px 0;
    width: 100%;
    position: relative;
  }
  .label {
    text-align: right;
    width: 30%;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
  }
  .input,
  .select {
    width: 60%;
    font-size: 1.3rem;
    outline: none;
    border-radius: 6px;
    padding: 2px 12px;
    margin: 0 12px;
    box-shadow: 0 0 0 transparent;
  }
  .input:invalid,
  .select:invalid {
    box-shadow: 0 0 3px 3px var(--warning-4);
  }
  .select {
    border-width: 2px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  }
  .errorMessage {
    display: none;
    font-size: 1rem;
    font-weight: 700;
    color: var(--warning-4);
    position: absolute;
    bottom: -8px;
    left: 120px;
  }
  .passCheckMessage {
    display: none;
    left: 0;
    bottom: 68px;
    padding: 24px;
    background-color: var(--primary-0);
    border: 2px solid var(--primary-6);
    border-radius: 12px;
    z-index: 100;
  }
  .invalid {
    display: initial;
  }
  .buttonContainer {
    margin-top: 36px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .button {
      width: 90%;
      margin: 10px 0;
      border: 2px solid var(--primary-6);
      background-color: white;
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
    }
  }
`;
