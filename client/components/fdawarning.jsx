import React from 'react';

export default class FDAWarning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCity: '',
      warning: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFDAWarning = this.getFDAWarning.bind(this);
  }

  getFDAWarning() {
    const userCity = this.state.userCity;
    fetch(`https://api.fda.gov/food/enforcement.json?search=city:"${userCity}"`)
      .then(response => {

        return response.json();
      })
      .then(data => {
        this.setState({ warning: data });
      })
      .catch(err => {
        console.error('Err: ', err);
      });
  }

  handleChange(event) {
    this.setState({ userCity: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getFDAWarning();
  }

  render() {
    const warningObj = this.state.warning;
    if (warningObj.length === 0) {
      return (
        <div>
          <form onSubmit={this.handleSubmit} >
            <label>
              City:
              <input type="text" value={this.state.userCity} onChange={this.handleChange} />
            </label>
            <button type="submit" />
          </form>
        </div>
      );
    } else {
      const FDADisclaimer = warningObj.meta.disclaimer;
      const FDADescription = warningObj.results[0].product_description;
      const FDAIssued = warningObj.results[0].report_date;
      const FDACity = warningObj.results[0].city;
      const FDAReason = warningObj.results[0].reason_for_recall;
      const FDADistribution = warningObj.results[0].distribution_pattern;
      const FDAQuantity = warningObj.results[0].product_quantity;
      return (
        <div>
          <form onSubmit={this.handleSubmit} >
            <label>
              City:
              <input type="text" value={this.state.userCity} onChange={this.handleChange} />
            </label>
            <button type="submit" />
          </form>
          <h1>FDA Warning!</h1>
          <h2>Disclaimer: {FDADisclaimer} </h2>
          <h5>Product Description: {FDADescription}</h5>
          <h5>Date issued: {FDAIssued} </h5>
          <h5>Cities Impacted: {FDACity} </h5>
          <h5>Reason for Recall: {FDAReason}</h5>
          <h5>Distribution Pattern: {FDADistribution}</h5>
          <h5>Quantity: {FDAQuantity} </h5>
        </div>
      );
    }
  }
}
