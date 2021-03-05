import React, { Component } from 'react'
import styled from 'styled-components'
// import Backdrop from '../UI/Backdrop'
import About from './About'
import Change from './Change'
import FDA from './FDA'
import Main from './Main'

class Setting extends Component {
	state = {
	  settingDisplay: 'main'
	}

	handleClick = e => {
	  e.preventDefault()
	  const name = e.target.name
	  switch (name) {
	    case 'fda':
	      this.setState({ settingDisplay: 'fda' })
	      break
	    case 'main':
	      this.setState({ settingDisplay: 'main' })
	      break
	    case 'setting':
	      this.setState({ settingDisplay: 'setting' })
	      break
	    case 'about':
	      this.setState({ settingDisplay: 'about' })
	      break
	    case 'signout':
	      this.setState({ settingDisplay: 'signout' })
	      break
	    case 'confirm':
	      this.props.logout()
	      break
	    case 'return':
	      this.props.handleClick()
	      break
	    default:
	      break
	  }
	}

	render() {
	  let SettingDisplay
	  const display = this.state.settingDisplay
	  if (display === 'main') {
	    SettingDisplay = <Main
	      handleClick={ this.handleClick }
	    />
	  } else if (display === 'fda') {
	    SettingDisplay = <FDA
	      handleClick={ this.handleClick }
	      userData={ this.props.userData }
	    />
	  } else if (display === 'setting') {
	    SettingDisplay = <Change
	      handleClick={ this.handleClick }
	    />
	  } else if (display === 'about') {
	    SettingDisplay = <About handleClick={ this.handleClick } />
	  } else if (display === 'signout') {
	    SettingDisplay = (
	      <>
	        <h1>CONFIRM YOU SIGNING OUT?</h1>
	        <button
	          className='button'
	          name='confirm'
	          onClick={ this.handleClick }
	        >Yes</button>
	        <button
	          className='button'
	          name='return'
	          onClick={ this.handleClick }
	        >No</button>
	      </>
	    )
	  }

	  return (
	    <Container>
	      {/* <Backdrop handleClick={ () => this.props.handleBackdropClick() } /> */}
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
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		text-align: center;
		background-color: var(--primary-1);
		transform: translateY(1000px);
		overflow-y: scroll;
	}
	.setting.open {
		animation: slideUp 0.3s forwards;
	}
	.setting.closed {
		animation: slideDown 0.3s forwards;
	}
	.section {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		height: 100%;
		.titleSection {
			padding: 12px 0;
		}
		.searchSection {
			padding-bottom: 36px;
		}
		.mainSection {
			height: 70%;
			width: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.buttonContainer {
			margin: 12px 0;
		}
		.paragraph {

		}
		.userData {
			font-size: 1.2rem;
		}
	}
	.mainButtonContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		.button {
			padding: 12px 24px;
			margin: 12px 0;
		}
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

`
