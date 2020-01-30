import React from 'react';
import Enter from './enter.jsx';
import ListMeals from './listEnterFood.jsx';

class EnterFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      todaysMeals: []
    });
    this.addMeal = this.addMeal.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  componentDidMount() {
    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls');
      })
      .catch(err => console.error(err));
  }

  addMeal(newMeal) {
    fetch('/api/enter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMeal)
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        const todaysMealsCopy = [...this.state.todaysMeals];
        const addedMeal = todaysMealsCopy.concat(newMeal.meal);
        this.setState({
          todaysMeals: addedMeal
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  removeFromList(removeMeal) {
    const todaysMealsCopy = [...this.state.todaysMeals];
    const removeIndex = todaysMealsCopy.indexOf(removeMeal);
    todaysMealsCopy.splice(removeIndex, 1);
    this.setState({
      todaysMeals: todaysMealsCopy
    });
  }

  render() {
    return (
      <>
        <div className="container">
          <Enter
            onSubmit={this.addMeal}
            todaysMeals={this.state.todaysMeals}
          />
          <div className="listBox mx-auto mt-2">
            <ListMeals
              todaysMeals={this.state.todaysMeals}
              onSubmit={this.removeFromList}
            />
          </div>
          <div className="row listMealsButtons justify-content-around mt-3">
            <button className="halfButton">Home</button>
            <button className="halfButton">Cancel</button>
          </div>
        </div>
      </>
    );
  }
}

export default EnterFood;
