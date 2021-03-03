import React, { Component } from 'react'

class Level3Day extends Component {
  render() {
    return (
      <section className='buttonContainer level3'>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Sunday</button>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Monday</button>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Tuesday</button>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Wednesday</button>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Thursday</button>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Friday</button>
        <button
          name='day'
          onClick={ this.props.handleClick }
          className='button'
        >Saturday</button>
      </section>
    )
  }
}

export default Level3Day
