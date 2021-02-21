import React, { Component } from 'react'
import styled from 'styled-components'

class WeeklyReview extends Component {

	state = {
	  weeklyReady: false,
	  sun: '',
	  mon: '',
	  tue: '',
	  wed: '',
	  thu: '',
	  fri: '',
	  sat: '',
	  sunReady: false,
	  monReady: false,
	  tueReady: false,
	  wedReady: false,
	  thuReady: false,
	  friReady: false,
	  satReady: false
	}

	componentDidMount() {
	  // const today = new Date()
	  // const day = today.getDay()
	  fetch('/api/list')
	    .then(response => response.json())
	    .then(data => {
	      const thisWeek = []
	      let lastDay = false
	      for (let i = 0; i < data.length; i++) {
	        if (!lastDay) {
	          const eatenDate = new Date(data[i].eatenAt)
	          const eatenDay = eatenDate.getDay()
	          if (eatenDay === '0') {
	            lastDay = true
	          }
	          thisWeek.push(data[i])
	        } else {
	          break
	        }
	      }

	      const sun = []
	      const mon = []
	      const tue = []
	      const wed = []
	      const thu = []
	      const fri = []
	      const sat = []

	      thisWeek.forEach(x => {
	        const dayNum = (new Date(x.eatenAt)).getDay()
	        switch (dayNum) {
	          case 0:
	            sun.push(x)
	            this.setState({
	              sunReady: true
	            })
	            break
	          case 1:
	            mon.push(x)
	            this.setState({
	              monReady: true
	            })
	            break
	          case 2:
	            tue.push(x)
	            this.setState({
	              tueReady: true
	            })
	            break
	          case 3:
	            wed.push(x)
	            this.setState({
	              wedReady: true
	            })
	            break
	          case 4:
	            thu.push(x)
	            this.setState({
	              thuReady: true
	            })
	            break
	          case 5:
	            fri.push(x)
	            this.setState({
	              friReady: true
	            })
	            break
	          case 6:
	            sat.push(x)
	            this.setState({
	              satReady: true
	            })
	            break
	        }
	      })
	      this.setState({
	        weeklyReady: true,
	        thisWeek: [
	          ['sun', sun, this.state.sunReady],
	          ['mon', mon, this.state.monReady],
	          ['tue', tue, this.state.tueReady],
	          ['wed', wed, this.state.wedReady],
	          ['thu', thu, this.state.thuReady],
	          ['fri', fri, this.state.friReady],
	          ['sat', sat, this.state.satReady]
	        ]
	      })
	    })
	}

	render() {
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
	          {
	            this.state.weeklyReady &&
	            this.state.thisWeek.map((x, index) => {
	              const name = x[0]
	              let avg
	              if (x[2]) {
	                const reports = []
	                x[1].forEach(x => reports.push(x.report))
	                const total = reports.reduce((a, b) => a + b)
	                avg = (total / x[1].length)
	              }
	              return <td key={ name }>{ avg }</td>
	            })
	          }
	        </tr>
	      </tbody>
	    </Table>
	  )
	}
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
