import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createAccount();
  }

  createAccount() {
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
    fetch('/api/sign-up', init)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          this.props.history.push('/home');
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
          <button type="submit" className="btn btn-primary">Create the Account!</button>
          <div>{this.state.message}</div>
        </form>
      </div>
    );
  }
}

export default Signup;
