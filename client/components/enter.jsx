import React from 'react';

class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: { meal: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      meals: { meal: event.target.value }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.meals);
  }

  render() {
    return (
      <form action=""
        onSubmit={ this.handleSubmit }
      >

        <div className="container">
          <div className="header">
            <span>Enter Meal</span>
          </div>
          <input
            type="text"
            className="input"
            placeholder="Enter Meal"
            name="enter"
            value= { this.state.meals.meal }
            onChange= { this.handleChange }
          />
          <button
            type="submit"
            className="addButton"
            value="Add"
          />
        </div>

      </form>
    );
  }
}

export default Enter;
