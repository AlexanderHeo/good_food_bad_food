import React, { Component } from 'react'
import styled from 'styled-components'
import RatingsList from './RatingsList'

class Lists extends Component {
  render() {
    return (
      <Container>
        <div className={ this.props.clicked ? `${'lists'} ${'open'}` : `${'lists'} ${'closed'}`}>
        	<h2 className='listTitle'>Good vs Bad</h2>
          <section className='listSection'>
          	<RatingsList />
          </section>
        </div>
      </Container>
    )
  }
}

export default Lists

const Container = styled.div`
	width: 100vw;
	height: calc(100vh - 80px);
	background-color: var(--gray-9);
	.lists {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--primary-1);
		transform: translateY(1000px);
	}
	.lists.open {
		animation: slideUp 0.3s forwards;
	}
	.lists.closed {
		animation: slideDown 0.3s forwards;
	}
	.listTitle {
		margin: 12px 0;
	}
	.listSection {
		width: 80%;
		border: 1px solid blue;
	}
`
