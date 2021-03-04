import React, { Component } from 'react'

class FDA extends Component {
  render() {
    return (
      <section className='section'>
        <div className='titleSection'>
        	<h1 className='title'>FDA Warning:</h1>
          <p className='userData'>{ this.props.userData.username } - { this.props.userData.city },, { this.props.userData.state}</p>
        </div>
        <div className='searchSection'>
          <input className='input' type='text'></input><button className='button'>Search</button>
        </div>
        <div className='mainSection'>
        	<p className='paragraph'>If there is an FDA Warning or food recall in your area, it will be alerted here.</p>
        </div>
        <div className='buttonContainer'>
          <button name='main' className='button' onClick={ this.props.handleClick }>RETURN</button>
        </div>
      </section>
    )
  }
}

export default FDA
