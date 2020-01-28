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
    this.setState({
      meals: { meal: '' }
    });
  }

  render() {
    return (
      <>
        <form action="" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="header">
              <h1 className="mt-4">Enter Meal</h1>
            </div>
          </div>

          <input
            type="text"
            className="input"
            placeholder="Enter Meal"
            name="enter"
            value={this.state.meals.meal}
            onChange={this.handleChange}
          />

          <button
            type="submit"
            className="fullButton inputButton"
            value="Add"
          >Add</button>
        </form>
        <div className="listBox mt-3 mx-auto"></div>

      </>

    );
  }
}

export default Enter;
