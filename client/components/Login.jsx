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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Create A Username</label>
            <input type="text" id="signupUsername" name="username" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Enter Your Password</label>
            <input type="password" id="signupPassword" name="password" onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Log In to Account</button>
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
