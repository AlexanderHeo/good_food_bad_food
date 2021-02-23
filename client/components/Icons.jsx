import React from 'react'
import styled from 'styled-components'

export const Hamburger = props => (
  <HamburgerContainer >
    <div className={ props.clicked ? `${'hamburger'} ${'open'}` : `${'hamburger'} ${'closed'}` }>
      <div className='bar bar1' />
      <div className='bar bar2' />
      <div className='bar bar3' />
    </div>
  </HamburgerContainer>
)

const HamburgerContainer = styled.div`

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		.bar {
			width: 30px;
			height: 3px;
			background-color: var(--primary-6);
			margin: 4px 0;
			border-radius: 10px;
		}
	}

	.hamburger .bar1 {
		transform: rotate(45deg) translate(5px, 4px);
	}
	.hamburger .bar2 {
		transform: opacity(1);
	}
	.hamburger .bar3 {
		transform: rotate(-45deg) translate(5px, -4px);
	}

	.hamburger.open .bar1 {
		animation: barOneOpen 0.3s forwards;
	}
	.hamburger.open .bar2 {
		animation: fadeOut 0.5s forwards;
	}
	.hamburger.open .bar3 {
		animation: barThreeOpen 0.3s forwards;
	}
	.hamburger.closed .bar1 {
		animation: barOneClosed 0.3s forwards;
	}
	.hamburger.closed .bar2 {
		animation: fadeIn 0.5s forwards;
	}
	.hamburger.closed .bar3 {
		animation: barThreeClosed 0.3s forwards;
	}

	@keyframes barOneOpen {
		from {
			width: 30px;
			transform: rotate(0) translate(0,0);
		}
		to {
			width: 35px;
			transform: rotate(45deg) translate(5px, 4px);
		}
	}
	@keyframes fadeOut {
		from {
			transform: translateX();
			opacity: 1;
		}
		to {
			transform: translateX(50px);
			opacity: 0;
		}
	}
	@keyframes barThreeOpen {
		from {
			width: 30px;
			transform: rotate(0) translate(0,0);
		}
		to {
			width: 35px;
			transform: rotate(-45deg) translate(5px, -4px);
		}
	}

	@keyframes barOneClosed {
		from {
			width: 35px;
			transform: rotate(45deg) translate(5px, 4px);
		}
		to {
			width: 30px;
			transform: rotate(0deg) translate(0,0);
		}
	}
	@keyframes fadeIn {
		from {
			width: 35px;
			opacity: 0;
			transform: translateX(50px);
		}
		to {
			width: 30px;
			opacity: 1;
			transform: translateX(0px);
		}
	}
	@keyframes barThreeClosed {
		from {
			width: 35px;
			transform: rotate(-45deg) translate(5px, -4px);
		}
		to {
			width: 30px;
			transform: rotate(0deg) translate(0,0);
		}
	}

`
