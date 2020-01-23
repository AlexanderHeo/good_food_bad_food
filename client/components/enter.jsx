import React from 'react';

class EnterFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterMeal: null,
      todaysMeals: null
    };
    this.handleEnterMeal = this.handleEnterMeal.bind(this);
  }

  componentDidMount() {
    // this.getTodaysMeals();
  }

  // addIngredients(success) {
  //   console.log(success);
  //   var ingredients = [];
  // }

  getTodaysMeals() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;

    fetch(`api/todaysMeals/${today}`)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {

        this.setState({
          todaysMeals: jsonData
        });
      });
  }

  handleEnterMeal(event) {
    this.setState({
      [event.target.meal]: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <span>Enter Food</span>
        </div>
        {/* <div className="input"></div> */}
        <input
          type="text"
          className="input"
          placeholder="Enter Meal"
          name="meal"
          value={ this.state.enterMeal }
          onChange={ this.handleEnterMeal }
        />
        <div className="addButton">
          <span>Add</span>
        </div>
        <div className="list"></div>
      </div>
    );
  }
}

export default EnterFood;
