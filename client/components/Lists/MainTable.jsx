import React, { Component } from 'react'
import styled from 'styled-components'
import FoodTable from './FoodTable'

class MainTable extends Component {
  render() {
    return (
      <MainTableContainer>
        <tbody className='mainBody'>
          {
            this.props.list.map(x => {
              const key = Object.keys(x)[0]
              return <tr key={key}>
                <td colSpan='2'>
                  <h5 className='foodTableTitle'>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                  <div className='foodTableContainer'>
                    <FoodTable
                      list={x}
                      buttonSwitched={this.props.buttonSwitched}
                    />
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </MainTableContainer>
    )
  }
}

export default MainTable

const MainTableContainer = styled.table`
	width: 100%;
	.mainBody { font-size: 1rem; }
	.mainBody>tr:nth-child(2n) .foodTableContainer {
		background-color: var(--primary-1);
	}
	.foodTableTitle { text-align: center; }
	.foodTableContainer {
		height: 70px;
		margin: 12px 18px;
		overflow: scroll;
		padding: 10px 20px;
		border-radius: 12px;
		box-shadow: -1px -1px 10px 1px var(--primary-0),
		1px 1px 10px 1px var(--primary-9);
	}
	.foodTable {
		width: 100%;
		.foodBody>tr { height: initial; }
		.foodBody>tr>td:first-of-type {
			width: 75%;
		}
		.foodBody>tr>td:first-of-type { text-align: left; }
		.foodBody>tr>td:last-of-type { text-align: right; }
	}
`
