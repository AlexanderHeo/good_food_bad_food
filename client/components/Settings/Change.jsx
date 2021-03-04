import React, { Component } from 'react'

class Change extends Component {
  render() {
    return (
      <section className='section'>
        <div className='titleSection'>
        	<h1 className='title'>Change Settings</h1>
        </div>
        <div className='mainSection'>
        	<p className='paragraph'>There are no settings to set at the moment. Please come back in future deployments, as I develop more cool stuff for this app.</p>
        </div>
        <div className='buttonContainer'>
          <button name='main' className='button' onClick={ this.props.handleClick }>RETURN</button>
        </div>
      </section>
    )
  }
}

export default Change
