import React, { Component } from 'react'
import styled from 'styled-components'

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
	      <div className="voteButtonContainer">
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

const UpVote = () => (
  <div className='upVoteComponent'>
    <div className='up1'/>
    <div className='up'/>
    <div className='up2'/>
  </div>
)

const DownVote = () => (
  <div className='downVoteComponent'>
    <div className='down1'/>
    <div className='down'/>
    <div className='down2'/>
  </div>
)

const ReturnChevron = () => (
  <>
    <div className='bar1' />
    <div className='bar2' />
  </>
)

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

		.bar1, .bar2 {
			width: 4px;
			height: 20px;
			border-radius: 10px;
			background-color: var(--primary-6);
		}
		.bar1 {
			transform: translate(12px, 4.5px) rotate(50deg);
		}
		.bar2 {
			transform: translate(12px, -4.5px) rotate(-50deg);
		}
	}

	.voteButtonContainer {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 24px;

		.voteButton {
			margin: 0 12px;
		}

		.upVote {
			.upVoteComponent {
				display: flex;
				justify-content: center;
				width: 100%;
				height: 100%;
				margin-top: 5px;
			}
			.up1, .up2, .up {
				width: 4px;
				border-radius: 10px;
				background-color: var(--primary-6);
			}
			.up1, .up2 {
				height: 15px;
			}
			.up1 {
				transform: rotate(35deg);
			}
			.up2 {
				transform: rotate(-35deg);
			}
			.up {
				height: 30px;
			}
		}

		.downVote {
			.downVoteComponent {
				display: flex;
				justify-content: center;
				align-items: baseline;
				width: 100%;
				height: 100%;
				margin-top: 5px;
			}
			.down1, .down2, .down {
				width: 4px;
				border-radius: 10px;
				background-color: var(--primary-6);
			}
			.down1, .down2 {
				height: 15px;
			}
			.down1 {
				transform: rotate(-35deg);
			}
			.down2 {
				transform: rotate(35deg);
			}
			.down {
				height: 30px;
			}
		}
	}
`
