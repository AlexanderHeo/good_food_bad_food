import React from 'react'

const Level2 = props => {
  let button = null
  if (props.dayOrRating === 'day') {
    button = <button
      name='day'
      onClick={ props.handleClick }
      className="button"
    >by Day</button>
  } else if (props.dayOrRating === 'rating') {
    button = <button
      name='overall'
      onClick={ props.handleClick }
      className="button"
    >Overall</button>
  }

  return (
    <>
      <button
        name='meal'
        onClick={ props.handleClick }
        className='button'
      >by Meal</button>
      <button
        name='food'
        onClick={ props.handleClick }
        className='button'
      >by Food</button>
      {button}
    </>
  )
}

export default Level2
