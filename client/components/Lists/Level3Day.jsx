import React, { Component } from 'react'

class Level3Day extends Component {
  render() {
    return (
      <section className='buttonContainer level3'>
        <button
          value='sunday'
          onClick={ this.props.handleClick }
          className='button'
        >Sunday</button>
        <button
          value='monday'
          onClick={ this.props.handleClick }
          className='button'
        >Monday</button>
        <button
          value='tuesday'
          onClick={ this.props.handleClick }
          className='button'
        >Tuesday</button>
        <button
          value='wednesday'
          onClick={ this.props.handleClick }
          className='button'
        >Wednesday</button>
        <button
          value='thursday'
          onClick={ this.props.handleClick }
          className='button'
        >Thursday</button>
        <button
          value='friday'
          onClick={ this.props.handleClick }
          className='button'
        >Friday</button>
        <button
          value='saturday'
          onClick={ this.props.handleClick }
          className='button'
        >Saturday</button>
      </section>
    )
  }
}

export default Level3Day
