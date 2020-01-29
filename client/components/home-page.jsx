import React from 'react';
// import { Link } from 'react-router-dom';

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
            </div>
          </form>
        </div>

      </div>

    );
  }
}

export default Home;
