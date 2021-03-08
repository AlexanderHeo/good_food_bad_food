import React, { Component } from 'react'
import styled from 'styled-components'
import MainTable from './MainTable'

class RatingsList extends Component {
	state = {
	  buttonSwitched: false
	}

	handleClick = () => this.setState({ buttonSwitched: !this.state.buttonSwitched })

	render() {
	  return (
	    <Container>
	      <div className='tableContainer'>
	        <h3 className='tableContainerTitle' onClick={this.handleClick}>
	          <div className='chevron chevronLeft'>&lt;</div>
	          {
	            this.state.buttonSwitched
	              ? 'The Bad'
	              : 'The Good'
	        	}
	          <div className='chevron chevronRight'>&gt;</div>
	        </h3>
	        <MainTable
	          list={this.props.sortedList}
	          buttonSwitched={this.state.buttonSwitched}
	        />
	      </div>
	    </Container>
	  )
	}
}

export default RatingsList

const Container = styled.div`
	width: 100%;
	.tableContainer {
		padding: 36px 0;
		background-color: var(--primary-0);
		border-radius: 12px;
		box-shadow: inset -1px -1px 10px 1px var(--primary-9), inset 1px 1px 10px 1px var(--primary-0);
		.tableContainerTitle {
			position: relative;
			text-align: center;
			.chevron {
				position: absolute;
				bottom: 0;
			}
			.chevronLeft {
				left: 30px;
			}
			.chevronRight {
				right: 30px;
			}
		}
	}
`
