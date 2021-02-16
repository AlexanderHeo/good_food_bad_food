import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    status: false,
    message: ''
  };

  handleButtonClick(e) {
    e.preventDefault()
    this.loginAccount()
  }

  loginAccount() {
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
          this.setState({ status: true });
        } else {
          this.setState({ message: result.error });
        }
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const type = event.target.name;
    if (type === 'username') return this.setState({ username: event.target.value });
    this.setState({ password: event.target.value });
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
              type="text"
              name="username"
              onChange={ this.handleChange }/>
          </fieldset>
          <div className="button-container">
            <button
              className="button"
              onClick={ this.handleButtonClick }>Log In</button>
            <Link
              className="button"
              to="ls"
            >Cancel
            </Link>
          </div>
        </form>
      </LoginContainer>
      // <div className="container">
      //   <h1 className="header mt-3 mx-auto">Log In</h1>
      //   <div className="row ls-icons d-flex justify-content-around my-3 text-center">
      //     <img src="images/angel.png" alt="" />
      //     <img src="images/devil.png" alt="" />
      //   </div>
      //   <form className="ls" onSubmit={this.handleSubmit}>
      //     <div className="row d-flex justify-content-center">
      //       <div className="form-group d-flex flex-column text-center">
      //         <label>Enter Your Username</label>
      //         <input type="text" id="signupUsername" name="username" onChange={this.handleChange} />
      //       </div>
      //     </div>
      //     <div className="row d-flex justify-content-center">
      //       <div className="form-group d-flex flex-column text-center">
      //         <label>Enter Your Password</label>
      //         <input type="password" id="signupPassword" name="password" onChange={this.handleChange} />
      //       </div>
      //     </div>
      //     <div className="row d-flex justify-content-center mt-5">
      //       <button type="submit" className="halfButton">Log In to Account</button>
      //     </div>
      //     <div>{this.state.message}</div>
      //   </form>
      //   {
      //     this.state.status
      //       ? <Redirect from='/login' to='/home'></Redirect> : null
      //   }
      //   <div className="row listMealsButtons justify-content-around mt-3">
      //     <Link className="halfButton text-center" to="/home">Home</Link>
      //   </div>
      // </div>
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
	}
`
