import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls');
        this.setState({ isLoading: false });
      })
      .catch(err => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick(event) {
    const { history } = this.props;
    history.push(`/${event.target.name}`);
  }

  handleLogOut() {
    fetch('/api/log-out')
      .then(response => response.json())
      .then(result => {
        if (result.success) return this.props.history.push('/ls');
      })
      .catch(err => console.error(err));
  }

  render() {
    const status = this.state.isLoading;
    if (status) return null;
    return (
      <div className="container d-flex flex-column">

        <div className="homeHeader d-flex">
          <div>Good Food</div>
          <div>Bad Food</div>
        </div>

        <div className="openBox">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex flex-column">
              <button className="fullButton" type="submit" name="enter" onClick={this.handleClick}>Enter A Meal</button>
              <button className="fullButton" type="submit" name="entereffects" onClick={this.handleClick}>Enter you Feeling</button>
              <button className="fullButton" type="submit" name="list" onClick={this.handleClick}>Check Meal List</button>
              <button className="fullButton" type="submit" name="warning" onClick={this.handleClick}>FDA Warnings</button>
              <button type="submit" onClick={this.handleLogOut}>Log Out</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
