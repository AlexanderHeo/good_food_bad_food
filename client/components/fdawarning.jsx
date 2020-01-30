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
        <form onSubmit={this.handleSubmit} >
          <div className="container">
            <div className="mt-4 d-flex justify-content-center">
              <label className="mt-1">City:</label>
              <input type="text" value={this.state.userCity} onChange={this.handleChange} />
              <button className="halfButton" type="submit">Submit</button>
            </div>
          </div>
        </form>
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
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="mt-4 d-flex justify-content-center">
              <label className="mt-1">City:</label>
              <input type="text" value={this.state.userCity} onChange={this.handleChange} />
              <button className="halfButton" type="submit">Submit</button>
            </div>
            <div className="mx-auto">
              <h1>FDA Warning:</h1>
            </div>
            <div>
              <p className="fdaDisclaimer">Disclaimer:{FDADisclaimer}</p>
              <p>Product Description: {FDADescription}</p>
              <p>Date issued: {FDAIssued} </p>
              <p>Cities Impacted: {FDACity} </p>
              <p>Reason for Recall: {FDAReason}</p>
              <p>Distribution Pattern: {FDADistribution}</p>
              <p>Quantity: {FDAQuantity} </p>
            </div>
          </div>
        </form>
      );
    }
  }
}
