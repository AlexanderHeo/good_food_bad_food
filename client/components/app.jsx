import React from 'react';
// import SingleMeal from './single-meal'
import RateMeal from './rate-meal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rateFood: false
    };
  }

  // componentDidMount() {
  //   fetch('/api/health-check')
  //     .then(res => res.json())
  //     .then(data => this.setState({ message: data.message || data.error }))
  //     .catch(err => this.setState({ message: err.message }))
  //     .finally(() => this.setState({ isLoading: false }));
  // }

  render() {
    return (
      <RateMeal />
    );
  }
}
