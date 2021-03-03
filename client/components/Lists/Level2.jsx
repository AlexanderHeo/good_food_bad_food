import React, { Component } from 'react'

class Level2 extends Component {
  render() {
    let button = null
    if (this.props.dayOrRating === 'day') {
      button = <button
        name='byDay'
        onClick={ this.props.handleClick }
        className='button'
      >by Day</button>
    } else if (this.props.dayOrRating === 'rating') {
      button = <button
        name='overall'
        onClick={ this.props.handleClick }
        className='button'
      >Overall</button>
    }
    return (
      <section className='buttonContainer level2'>
        <button
          name='level21'
          onClick={ this.props.handleClick }
          className='button'
        >by Meal</button>
        {button}
      </section>
    )
  }
}

export default Level2
