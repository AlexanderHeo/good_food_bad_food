import React, { Component } from 'react'

class Level3Meal extends Component {
  render() {
    return (
      <section className='buttonContainer level3'>
        <button
          value='breakfast'
          onClick={ this.props.handleClick }
          className='button'
        >Breakfast</button>
        <button
          value='lunch'
          onClick={ this.props.handleClick }
          className='button'
        >Lunch</button>
        <button
          value='dinner'
          onClick={ this.props.handleClick }
          className='button'
        >Dinner</button>
        <button
          value='snacks'
          onClick={ this.props.handleClick }
          className='button'
        >Snacks</button>
      </section>
    )
  }
}

export default Level3Meal
