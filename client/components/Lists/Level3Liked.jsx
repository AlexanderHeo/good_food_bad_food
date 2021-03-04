import React from 'react'

const Level3Liked = props => {
  return (
    <section className='buttonContainer level3'>
      <button
        name='breakfast'
        onClick={ props.handleClick }
        className='button'
      >Breakfast</button>
      <button
        name='lunch'
        onClick={ props.handleClick }
        className='button'
      >Lunch</button>
      <button
        name='dinner'
        onClick={ props.handleClick }
        className='button'
      >Dinner</button>
      <button
        name='snacks'
        onClick={ props.handleClick }
        className='button'
      >Snacks</button>
    </section>
  )
}

export default Level3Liked
