import React from 'react'
import styled from 'styled-components'
import { Hamburger } from './Icons'

const Footer = props => (
  <Container>
    <button
      name='hamburger'
      onClick={ props.handleClick }
      className='button'
    >
      <Hamburger clicked={ props.clicked }/>
      {/* <div className={ props.clicked ? `${'hamburger'} ${'clicked'}` : 'hamburger' }>
        <div className='bar bar1' />
        <div className='bar bar2' />
        <div className='bar bar3' />
      </div> */}
    </button>
  </Container>
)

export default Footer

const Container = styled.div`
	width: 100%;
	height: 80px;
	background-color: var(--primary-2);
	display: flex;
	justify-content: center;
	align-items: center;
	.button {
		padding: 0;
		border-radius: 50%;
		background-color: var(--primary-1);
		outline: none;
		width: 50px;
		height: 50px
	}

	/* .hamburger {
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
	.hamburger.clicked .bar1 {
		animation: barOne 0.3s forwards
	}
	.hamburger.clicked .bar2 {
		animation: fadeOut 0.5s forwards
	}
	.hamburger.clicked .bar3 {
		animation: barThree 0.3s forwards
	}
	@keyframes barOne {
		to {
			transform: translate(0, 11px) rotate(45deg) ;
		}
	}
	@keyframes fadeOut {
		to {
			opacity: 0
		}
	}
	@keyframes barThree {
		to {
			transform: translate(0, -11px) rotate(-45deg);
		}
	} */
`
