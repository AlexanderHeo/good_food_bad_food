import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      status: false,
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.loginAccount();
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
      <div className="container">
        <h1 className="header mt-3 mx-auto">Log In</h1>
        <div className="row ls-icons d-flex justify-content-around my-3 text-center">
          <img src="images/angel.png" alt="" />
          <img src="images/devil.png" alt="" />
        </div>
        <form className="ls" onSubmit={this.handleSubmit}>
          <div className="row d-flex justify-content-center">
            <div className="form-group d-flex flex-column text-center">
              <label>Enter Your Username</label>
              <input type="text" id="signupUsername" name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="form-group d-flex flex-column text-center">
              <label>Enter Your Password</label>
              <input type="password" id="signupPassword" name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <button type="submit" className="halfButton">Log In to Account</button>
          </div>
          <div>{this.state.message}</div>
        </form>
        {
          this.state.status
            ? <Redirect from='/login' to='/home'></Redirect> : null
        }
        <div className="row listMealsButtons justify-content-around mt-3">
          <Link className="halfButton text-center" to="/home">Home</Link>
        </div>
      </div>
    );
  }
}

export default Login;
