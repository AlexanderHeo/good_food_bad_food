import React from 'react';
import { Redirect } from 'react-router-dom';

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
      <div className="container">14
        <div className="row ls-icons d-flex justify-content-around my-5 text-center">
          <img src="images/angel.png" alt="" />
          <img src="images/devil.png" alt="" />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row d-flex justify-content-center">
            <div className="form-group d-flex flex-column">
              <label>Create A Username</label>
              <input type="text" id="signupUsername" name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="form-group d-flex flex-column">
              <label>Enter A Password</label>
              <input type="password" id="signupPassword" name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <button type="submit" className="btn btn-primary">Log In to Account</button>
          </div>
          <div>{this.state.message}</div>
        </form>
        {
          this.state.status
            ? <Redirect from='/login' to='/home'></Redirect> : null
        }
      </div>
    );
  }
}

export default Login;
