import React, { Component } from 'react'
import styled from 'styled-components'

class Footer extends Component {
	state = {
	  clicked: false
	}

	handleClick = e => {
	  e.preventDefault()
	  this.setState({
	    clicked: !this.state.clicked
	  })
	  this.props.clicked(e)
	}

	render() {
	  return (
	    <Container>
	      <button
	        name='hamburger'
	        onClick={ this.handleClick }
	      >
	        <Hamburger clicked={ this.state.clicked }/>
	      </button>
	    </Container>
	  )
	}
}

export default Footer

const Hamburger = props => (
  <div className={ props.clicked ? `${'hamburger'} ${'clicked'}` : 'hamburger' }>
    <div className='bar bar1' />
    <div className='bar bar2' />
    <div className='bar bar3' />
  </div>
)

const Container = styled.div`
	width: 100%;
	height: 80px;
	background-color: var(--primary-2);
	display: flex;
	justify-content: center;
	align-items: center;
	button {
		padding: 0;
		border-radius: 50%;
		background-color: var(--primary-1);
		outline: none;
	}

	.hamburger {
		width: 50px;
		height: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.bar {
			width: 30px;
			height: 3px;
			background-color: var(--primary-6);
			margin: 4px 0;
			border-radius: 10px;
		}
	}
`
