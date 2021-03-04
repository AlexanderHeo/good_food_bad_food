import React, { Component } from 'react'

class Level3Overall extends Component {
  render() {
    return (
      <section className='buttonContainer level3'>
        <button
          name='overall'
          onClick={ this.props.handleClick }
          className='button'
        >Overall</button>
      </section>
    )
  }
}

export default Level3Overall
