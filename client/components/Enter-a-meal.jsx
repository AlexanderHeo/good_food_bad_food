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
        const addedMeal = todaysMealsCopy.concat(jsonData.name);
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
        <Enter
          onSubmit={this.addMeal}
          todaysMeals={this.state.todaysMeals}
        />
        <ListMeals
          todaysMeals={this.state.todaysMeals}
          onSubmit={this.removeFromList}
        />
      </>
    );
  }
}

export default EnterFood;
