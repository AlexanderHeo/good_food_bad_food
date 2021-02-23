import React, { Component } from 'react'
import styled from 'styled-components'
import Backdrop from './Backdrop'

class Setting extends Component {
	state = {
	  settingDisplay: 'main'
	}

	handleClick = e => {
	  e.preventDefault()
	  const name = e.target.name
	  if (name === 'main') this.setState({ settingDisplay: 'main' })
	  else if (name === 'setting') this.setState({ settingDisplay: 'setting' })
	  else if (name === 'about') this.setState({ settingDisplay: 'about' })
	  else if (name === 'signout') this.setState({ settingDisplay: 'signout' })
	  else if (name === 'confirm') this.props.logout()
	  else if (name === 'return') this.props.handleClick()
	}

	render() {
	  let SettingDisplay
	  const display = this.state.settingDisplay
	  if (display === 'main') {
	    SettingDisplay = <section className='main'>
	      <h1 className='title'>Settings</h1>
	      <div className='buttonContainer'>
	        <button name='setting' className='button' onClick={ this.handleClick }
	        >
						Change Settings
	        </button>
	        <button name='about' className='button' onClick={ this.handleClick }
	        >
						About
	        </button>
	        <button name='signout' className='button' onClick={ this.handleClick }
	        >
						Sign Out
	        </button>
	      </div>
	    </section>
	  } else if (display === 'setting') {
	    SettingDisplay = (
	      <>
	        <h1>CHANGE YO SETTINGS HERE</h1>
	        <p>There is nothing to adjust here, please come back in future versions to see what you will be able to control!</p>
	        <button className='button' name='main' onClick={ this.handleClick }>return</button>
	      </>
	    )
	  } else if (display === 'about') {
	    SettingDisplay = (
	      <>
	        <h1>THIS APP IS ABOUT:</h1>
	        <p>There is nothing to see here, please come back in future versions to see the complete About Me page.</p>
	        <button className='button' name='main' onClick={ this.handleClick }>return</button>
	      </>
	    )
	  } else if (display === 'signout') {
	    SettingDisplay = (
	      <>
	        <h1>CONFIRM YOU SIGNING OUT?</h1>
	        <button className='button' name='confirm' onClick={ this.handleClick }
	        >
						Yes
	        </button>
	        <button className='button' name='return' onClick={ this.handleClick }
	        >
						No
	        </button>
	      </>
	    )
	  }

	  return (
	    <Container>
	      <Backdrop handleClick={ this.props.handleClick } />
	      <div className={ this.props.clicked ? `${'setting'} ${'open'}` : `${'setting'} ${'closed'}`}>
	        { SettingDisplay }
	      </div>
	    </Container>
	  )
	}
}

export default Setting

const Container = styled.div`

	.setting {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
		height: 60%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		text-align: center;
		background-color: var(--primary-1);
		transform: translateY(1000px);
	}
	.main {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 100%;
	}
	.title {
		height: 20%;
	}
	.setting.open {
		animation: slideUp 0.3s forwards;
	}
	.setting.closed {
		animation: slideDown 0.3s forwards;
	}
	@keyframes slideUp {
		from {
			transform: translateY(1000px);
		}
		to {
			transform: translateY(0);
		}
	}
	@keyframes slideDown {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(1000px);
		}
	}

	.buttonContainer {
		display: flex;
		flex-direction: column;

		.button {
			padding: 12px 24px;
			margin: 12px 0;
		}
	}

`
