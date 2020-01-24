import React from 'react';
import Enter from './enter.jsx';
import ListMeals from './listEnterFood.jsx';

class EnterFoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      todaysMeals: []
    });
    this.addMeal = this.addMeal.bind(this);
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

  render() {
    return (
      <>
        <Enter
          onSubmit={ this.addMeal }
          todaysMeals={ this.state.todaysMeals }
        />
        <ListMeals
          todaysMeals={ this.state.todaysMeals }
        />
      </>
    );
  }
}

export default EnterFoodScreen;
