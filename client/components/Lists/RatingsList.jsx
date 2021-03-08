import React, { Component } from 'react'
import styled from 'styled-components'
import MainTable from './MainTable'

class RatingsList extends Component {
  render() {
    return (
      <Container>
        <div className='tableContainer'>
          <h3 className='tableContainerTitle'>Ratings List</h3>
          <MainTable list={this.props.sortedList}/>
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
			text-align: center;
		}
	}
`
