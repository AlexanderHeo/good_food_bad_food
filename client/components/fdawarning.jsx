import React from 'react'

export default class FDAWarning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const cityText = this.state.city
    fetch(`https://api.fda.gov/food/enforcement.json?search=city:"${cityText}"`)
      .then(response => {
        response.json();
      })
      .catch(err => {
        alert('Err: ', err);
      });
  }

  handleChange(event){
    this.setState({city: event.target.value})
    console.log("city: ", city)
  }

  handleSubmit(event){
    event.preventDefault();
    this.componentDidMount
  }

  render(){
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          City:
          <input type="text" value={this.state.city} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
