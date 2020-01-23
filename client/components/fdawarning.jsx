import React from 'react';

export default class FDAWarning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
  }

  componentDidMount() {
    const cityText = 'Irvine';
    const FDAWarning = response.meta.disclaimer;
    const FDADateIssued = response.results[0].report_date;
    const FDACity = response.results[0].city;
    const FDAReason = response.results[0].reason_for_recall;
    const FDADescription = response.results[0].product_description;
    const FDAQuantity = response.results[0].product_quantity;
    const FDADistribution = response.results[0].distribution_pattern;
    fetch(`https://api.fda.gov/food/enforcement.json?search=city:"${cityText}"&limit=1`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('warning data: ', response);
      })
      .catch(err => {
        console.log('Err: ', err);
      });
  }

  render() {
    return (
      <div>
        <h1>FDA Warning:</h1>
        <h5>Product Description: {FDADescription}</h5>
        <h5>Disclaimer: {FDAWarning} </h5>
        <h5>Date issued: {FDADateIssued} </h5>
        <h5>Cities Impacted: {FDACity} </h5>
        <h5>Reason for Recall: {FDAReason}</h5>
        <h5>Distribution Pattern: {FDADistribution}</h5>
        <h5>Quantity: {FDAQuantity} </h5>
      </div>
      // <form onSubmit={this.handleSubmit}>
      //   <label>
      //     City:
      //     <input type="text" value={this.state.city} onChange={this.handleChange} />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
    );
  }
}
