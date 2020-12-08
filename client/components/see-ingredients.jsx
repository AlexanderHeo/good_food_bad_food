import React from 'react';

export default class SeeIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    const mealId = parseInt(this.props.mealId);
    fetch(`/api/ingredients/${mealId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ ingredients: data });
      })
      .catch(err => {
        alert('Error: ', err);
      });
  }

  render() {
    const data = this.state.ingredients;
    const mealIngredients = data.map(d => <li key={d.ingredientName}>{d.ingredientName}</li>);
    return (
      <div className={'list-item, ml-4'}>
        {mealIngredients}
      </div>
    );
  }
}
