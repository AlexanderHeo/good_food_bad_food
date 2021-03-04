import React from 'react'

const Level1 = props => {
  let average, most, least
  const level1 = props.level1
  if (level1 === 'average') {
    average = 'highlight'
  } else if (level1 === 'most') {
    most = 'highlight'
  } else if (level1 === 'least') {
    least = 'highlight'
  }

  return (
    <>
      <button
        name='average'
        onClick={ props.handleClick }
        className={`button ${average}`}
      >Average Rating</button>
      <button
        name='most'
        onClick={ props.handleClick }
        className={`button ${most}`}
      >Most Favorite</button>
      <button
        name='least'
        onClick={ props.handleClick }
        className={`button ${least}`}
      >Least Liked</button>
    </>
  )
}

export default Level1
