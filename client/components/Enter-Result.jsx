import React, { Component } from 'react'
import styled from 'styled-components'
import { DownVote, ReturnChevron, UpVote } from './Icons'
class EnterResult extends Component {
	state = {
	  nameValue: '',
	  resultValue: '',
	  errorMessage: ''
	}

	handleClick = e => {
	  e.preventDefault()
	  const name = e.currentTarget.name
	  if (name === 'return') {
	    this.props.return('return')
	  } else {
	    this.props.addResult(this.props.foodItems, name)
	  }
	}

	render() {
	  return (
	    <Container>
	      <button name='return' className='returnButton' onClick={ this.handleClick }>
	        <ReturnChevron />
	      </button>
	      <h2 className='mealtime'>{ this.props.mealtime }</h2>
	      <h2 className='foodItems'>{ this.props.foodItems.name }</h2>
	      <div className='voteButtonContainer'>
	        <button name='upVote' className='voteButton upVote' onClick={ this.handleClick }>
	          <UpVote />
	        </button>
	        <button name='downVote' className='voteButton downVote' onClick={ this.handleClick }>
	          <DownVote />
	        </button>
	      </div>
	    </Container>
	  )
	}
}

export default EnterResult

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--primary-2);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.returnButton, .upVote, .downVote {
		width: 50px;
		height: 50px;
		border: 4px solid var(--primary-6);
		border-radius: 50%;
	}
	.returnButton {
		position: absolute;
		top: 0;
		left: 0;
		margin: 12px;
	}
	.voteButtonContainer {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 24px;
	}
	.voteButton {
		margin: 0 12px;
	}

`
