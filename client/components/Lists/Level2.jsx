import React from 'react'

const Level2 = props => {
  let button = null
  if (this.props.dayOrRating === 'day') {
    button = <button
      name='day'
      onClick={ this.props.handleClick }
      className="button"
    >by Day</button>
  } else if (this.props.dayOrRating === 'rating') {
    button = <button
      name='overall'
      onClick={ this.props.handleClick }
      className="button"
    >Overall</button>
  }

  return (
    <section className='buttonContainer level2'>
      <button
        name='meal'
        onClick={ this.props.handleClick }
        className='button'
      >by Meal</button>
      <button
        name='food'
        onClick={ this.props.handleClick }
        className='button'
      >by Food</button>
      {button}
    </section>
  )
}

export default Level2
