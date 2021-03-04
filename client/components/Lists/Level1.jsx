import React from 'react'

const Level1 = props => {
  let average, most, least
  const level1 = this.props.level1
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
        onClick={ this.props.handleClick }
        className={`button ${average}`}
      >Average Rating</button>
      <button
        name='most'
        onClick={ this.props.handleClick }
        className={`button ${most}`}
      >Most Favorite</button>
      <button
        name='least'
        onClick={ this.props.handleClick }
        className={`button ${least}`}
      >Least Liked</button>
    </>
  )
}

export default Level1
