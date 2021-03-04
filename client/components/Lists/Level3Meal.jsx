import React, { Component } from 'react'

class Level3Meal extends Component {
  render() {
    return (
      <section className='buttonContainer level3'>
        <button
          name='meal'
          onClick={ this.props.handleClick }
          className='button'
        >Breakfast</button>
        <button
          name='meal'
          onClick={ this.props.handleClick }
          className='button'
        >Lunch</button>
        <button
          name='meal'
          onClick={ this.props.handleClick }
          className='button'
        >Dinner</button>
        <button
          name='meal'
          onClick={ this.props.handleClick }
          className='button'
        >Snacks</button>
      </section>
    )
  }
}

export default Level3Meal
