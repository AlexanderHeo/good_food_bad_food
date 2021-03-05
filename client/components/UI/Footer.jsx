import React from 'react'
import styled from 'styled-components'
import { Hamburger, List } from './Icons'

const Footer = props => (
  <Container>
    {
      !props.isToday &&
			<button
			  name='today'
			  onClick={ props.handleClick }
			  className='button home'
			>
			  <span className="iconify" data-icon="bx:bxs-home-smile" data-inline="false"></span>
			</button>
    }
    <button
      name='list'
      onClick={ props.handleClick }
      className='button list'
    >
      <List clicked={ props.listClicked } />
    </button>
    <button
      name='hamburger'
      onClick={ props.handleClick }
      className='button hamburger'
    >
      <Hamburger clicked={ props.clicked } />
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
	.home, .list {
		font-size: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`
