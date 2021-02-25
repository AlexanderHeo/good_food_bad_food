import React from 'react'
import styled from 'styled-components'

const RatingSystem = props => (
  <Container>
    <div className='arrow'>
      <div className='end leftEnd'>Bad</div>
      <button name='1' className='selection one' onClick={ props.handleClick }>1</button>
      <button name='2' className='selection two' onClick={ props.handleClick }>2</button>
      <button name='3' className='selection three' onClick={ props.handleClick }>3</button>
      <button name='4' className='selection four' onClick={ props.handleClick }>4</button>
      <button name='5' className='selection five' onClick={ props.handleClick }>5</button>
      <div className='end rightend'>Good</div>
    </div>
  </Container>
)

export default RatingSystem

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;

	.arrow {
		width: 80%;
		display: flex;
		.end, .selection {
			width: calc(100% / 7);
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--primary-0);

			border-left: 4px solid var(--primary-6);
			border-top: 4px solid var(--primary-6);
			border-bottom: 4px solid var(--primary-6);
			border-collapse: collapse;
		}
		.end:last-of-type {
			border-right: 4px solid var(--primary-6);
		}
		.end:first-of-type {
			border-top-left-radius: 12px;
			border-bottom-left-radius: 12px;
		}
		.end:last-of-type {
			border-top-right-radius: 12px;
			border-bottom-right-radius: 12px;
		}
	}


`
