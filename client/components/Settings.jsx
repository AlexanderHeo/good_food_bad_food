import React from 'react'
import styled from 'styled-components'
import Backdrop from './Backdrop'

const Setting = props => (
  <Container>
    <Backdrop handleClick={ props.handleClick } />
    <div className={ props.clicked ? `${'setting'} ${'clicked'}` : 'setting'}>
      <button>Change Setting</button>
      <button>About</button>
    </div>
  </Container>
)

export default Setting

const Container = styled.div`

	.setting {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
		height: 60%;
		width: 100%;
		background-color: var(--primary-1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transform: translateY(1000px);
	}
	.setting.clicked {
		animation: slideUp 0.3s forwards;
	}
	@keyframes slideUp {
		to {
			transform: translateY(0);
		}
	}
`
