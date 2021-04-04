import React, { Component } from 'react';
import styled from 'styled-components';

class FDA extends Component {
  state = {
    city: '',
    state: '',
    data: [],
    dataReady: false,
    value: '',
    errorMessage: ''
  };

  componentDidMount() {
    if (this.props.city && this.props.state) {
      this.setState({
        city: this.props.city,
        state: this.props.state
      });
    }
    this.hitUpFDA();
  }

  handleClick = () => {
    if (!this.state.value) this.setState({ errorMessage: 'Please enter a city name.' });
    else this.hitUpFDA();
  };

  hitUpFDA = () => {
    const { city, value } = this.state;
    let input = city;
    if (value) input = value;
    fetch(`https://api.fda.gov/food/enforcement.json?search=city:"${input}"&sort=report_date:desc`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data: data,
          dataReady: true
        })
      )
      .catch((err) => console.error(err));
  };

  handleChange = (e) => this.setState({ value: e.target.value });

  handleOnFocus = (e) =>
    this.setState({
      data: [],
      dataReady: false,
      value: ''
    });

  render() {
    const { data } = this.state;
    return (
      <section className="section">
        <div className="titleSection">
          <h1 className="title">FDA Warning:</h1>
          <p className="userData">
            {this.props.userData.username} - {this.props.userData.city}, {this.props.userData.state}
          </p>
        </div>
        <div className="searchSection">
          <input
            className="input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onFocus={this.handleOnFocus}
          />
          <button onClick={this.handleClick} className="button">
            Search
          </button>
        </div>
        <div className="mainSection">
          {this.state.dataReady && <p className="disclaimer">{data.meta.disclaimer}</p>}
          {this.state.dataReady
            ? this.state.data.results.map((x) => (
              <WarningDisplay className="warning" key={x.recall_number}>
                <p className="p location">
                  {x.city}, {x.country}
                </p>
                <p className="p classification">{x.classification}</p>
                <p className="p code">{x.code_info}</p>
                <p className="p product">{x.product_description}</p>
                <p className="p reason">{x.reason_for_recall}</p>
                <p className="p distribution">{x.distribution_pattern}</p>
                <p className="p firm">{x.recalling_firm}</p>
              </WarningDisplay>
            ))
            : null}
        </div>
        <div className="buttonContainer">
          <button name="main" className="button" onClick={this.props.handleClick}>
            RETURN
          </button>
        </div>
      </section>
    );
  }
}

export default FDA;

const WarningDisplay = styled.div`
  .p {
    margin-bottom: 0.2rem;
  }
  .location {
    font-size: 1.3rem;
  }
  .reason,
  .distribution,
  .firm {
    font-size: 1.2rem;
  }
`;
