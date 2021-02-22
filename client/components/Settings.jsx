import React from 'react'
import styled from 'styled-components'
import Backdrop from './Backdrop'

const Setting = () => (
  <Container>
    <Backdrop />
    <div className='setting'>
      <button>Change Setting</button>
      <button>About</button>
    </div>
  </Container>
)

export default Setting

const Container = styled.div`
	/* width: 100%;
	height: 100%;
	background-color: var(--primary-0); */

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
	}
`
