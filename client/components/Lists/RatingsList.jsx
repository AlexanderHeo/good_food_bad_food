import React, { Component } from 'react'
import styled from 'styled-components'

class RatingsList extends Component {
  render() {
    return (
      <Container>
        <h3>Ratings List</h3>
        <MainTable>
          <thead>
            <tr>
              <th />
              <th>Food</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B</td>
              <td colSpan='2'>
                <div className='foodTableContainer'>
                  <FoodTable>
                    <tbody>
                      <tr>
                        <td>food item</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>food item</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>food item</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>food item</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>food item</td>
                        <td>5</td>
                      </tr>
                    </tbody>
                  </FoodTable>
                </div>
              </td>
            </tr>
            <tr>
              <td>L</td>
              <td colSpan='2'>
                <FoodTable>
                  <tbody>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                  </tbody>
                </FoodTable>
              </td>
            </tr>
            <tr>
              <td>D</td>
              <td colSpan='2'>
                <FoodTable>
                  <tbody>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                  </tbody>
                </FoodTable>
              </td>
            </tr>
            <tr>
              <td>S</td>
              <td colSpan='2'>
                <FoodTable>
                  <tbody>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>food item</td>
                      <td>5</td>
                    </tr>
                  </tbody>
                </FoodTable>
              </td>
            </tr>
          </tbody>
        </MainTable>
      </Container>
    )
  }
}

export default RatingsList

const Container = styled.div`
	width: 100%;
`
const MainTable = styled.table`
	width: 100%;
	border-spacing: 0;
	th, td {
		border: 1px solid red;
	}
	thead tr th:first-of-type,
	thead tr th:last-of-type { width: 20%; }
	thead tr th:nth-child(2) { width: 60%; }



	tbody tr td:first-of-type {
		text-align: center;
	}
	tbody tr td:nth-of-type(2),
	tbody tr td:last-of-type {
		overflow-y: scroll;
	}
	.foodTableContainer {
		height: 70px;
	}
`

const FoodTable = styled.table`
	width: 100%;
	tbody tr { height: initial; }
	tr td:first-of-type {
		width: 75%;
	}
`
