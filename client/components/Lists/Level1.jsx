import React, { Component } from 'react'

class Level1 extends Component {
  render() {
    return (
      <>
        <button
	          name='average'
	          onClick={ this.props.handleClick }
	          className='button'
	        >Average Rating</button>
	        <button
	          name='most'
	          onClick={ this.props.handleClick }
	          className='button'
	        >Most Favorite</button>
	        <button
	          name='least'
	          onClick={ this.props.handleClick }
	          className='button'
	        >Least Liked</button>
      </>
    )
  }
}

export default Level1
