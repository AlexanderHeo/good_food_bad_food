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
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex flex-column">
            <div className="row d-flex justify-content-center mt-3">
              <div className="header">
                <h1 className="">Enter Meal</h1>
              </div>
            </div>
            <div className="row mt-3">
              <div className="d-flex justify-content-center ml-4">
                <input
                  type="text"
                  className="input"
                  placeholder="ex. Hamburger"
                  name="enter"
                  value={this.state.meals.meal}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="fullButton mt-2"
              value="Add"
            >Add</button>
          </div>
        </form>
      </>
    );
  }
}

export default Enter;
