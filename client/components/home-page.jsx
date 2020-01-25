import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick(event) {
    const { history } = this.props;
    history.push(`/${event.target.name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit" name="enter" onClick={this.handleClick}>Enter A Meal</button>
        <button type="submit" name="rate" onClick={this.handleClick}>Enter you Feeling</button>
        <button type="submit" name="list" onClick={this.handleClick}>Check Meal List</button>
      </form>
    );
  }
}

export default Home;
