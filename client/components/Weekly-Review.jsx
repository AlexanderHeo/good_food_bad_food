import React from 'react'
import styled from 'styled-components'

const WeeklyReview = () => {
  return (
    <Table>
      <thead className='tableHead'>
        <tr className='tableRow'>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody className='tableBody'>
        <tr className='tableRow'>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default WeeklyReview

const Table = styled.table`
	width: 100%;
	/* border: 1px solid dodgerblue; */
	margin: 6px 0;
	text-align: center;
	background-color: var(--primary-1);

	.tableHead {
		border-bottom: 1px solid var(--primary-6);
	}
	.tableHead tr th {
		padding: 24px 0 12px 0;
	}
	.tableBody tr td {
		padding: 24px 0;
	}
	.tableRow td, .tableRow th {
		width: calc(100vw - 24px / 7)
	}

`
