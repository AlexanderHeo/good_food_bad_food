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
	  satReady: false,
	  thisWeek: [
	    ['sun', '', ''],
	    ['mon', '', ''],
	    ['tue', '', ''],
	    ['wed', '', ''],
	    ['thu', '', ''],
	    ['fri', '', ''],
	    ['sat', '', '']
	  ],
	  sundayDisplay: ''
	}

	componentDidMount() {

	  const thisWeek = []
	  const lastDay = false
	  for (let i = 0; i < this.props.list.length; i++) {
	    if (!lastDay) {
	      const eatenDate = new Date(this.props.list[i].eatenAt)
	      const todayDate = new Date()
	      const todayDay = todayDate.getDay()
	      const sunday = todayDate.setHours(todayDate.getHours() - (todayDay * 24))

	      const sundayDate = new Date(sunday)
	      const sundayDates = sundayDate.getDate()
	      const sundayMonth = sundayDate.getMonth() + 1
	      const sundayYear = sundayDate.getFullYear()
	      const sun = `${sundayMonth} ${sundayDates} ${sundayYear}`

	      this.setState({ sundayDisplay: sundayDates })

	      const thisSunday = new Date(sun)
	      if (eatenDate >= thisSunday) {
	        thisWeek.push(this.props.list[i])
	      }
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

	  let sunReady = 'false'
	  let monReady = 'false'
	  let tueReady = 'false'
	  let wedReady = 'false'
	  let thuReady = 'false'
	  let friReady = 'false'
	  let satReady = 'false'

	  thisWeek.forEach(x => {
	    const dayNum = (new Date(x.eatenAt)).getDay()
	    switch (dayNum) {
	      case 0:
	        sun.push(x)
	        sunReady = true
	        break
	      case 1:
	        mon.push(x)
	        monReady = true
	        break
	      case 2:
	        tue.push(x)
	        tueReady = true
	        break
	      case 3:
	        wed.push(x)
	        wedReady = true
	        break
	      case 4:
	        thu.push(x)
	        thuReady = true
	        break
	      case 5:
	        fri.push(x)
	        friReady = true
	        break
	      case 6:
	        sat.push(x)
	        satReady = true
	        break
	    }
	  })

	  this.setState({
	    weeklyReady: true,
	    thisWeek: [
	      ['sun', sun, sunReady],
	      ['mon', mon, monReady],
	      ['tue', tue, tueReady],
	      ['wed', wed, wedReady],
	      ['thu', thu, thuReady],
	      ['fri', fri, friReady],
	      ['sat', sat, satReady]
	    ]
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
	        <tr className='tableRow'>
	          <th>{this.state.sundayDisplay}</th>
	          <th>{this.state.sundayDisplay + 1}</th>
	          <th>{this.state.sundayDisplay + 1}</th>
	          <th>{this.state.sundayDisplay + 1}</th>
	          <th>{this.state.sundayDisplay + 1}</th>
	          <th>{this.state.sundayDisplay + 1}</th>
	          <th>{this.state.sundayDisplay + 1}</th>
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
	                const total = reports.reduce((a, b) => a + b, 0)
	                avg = (total / x[1].length)
	              }
	              if (isNaN(avg)) { avg = '' }
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
	margin: 6px 0;
	text-align: center;
	background-color: var(--primary-0);

	.tableHead {
		border-bottom: 1px solid var(--primary-6);
	}
	.tableHead tr:first-of-type th {
		padding: 24px 0 0 0;
	}
	.tableHead tr:last-of-type th {
		padding: 0 0 12px 0;
	}
	.tableBody tr td {
		padding: 24px 0;
	}
	.tableRow td, .tableRow th {
		width: calc(100vw - 24px / 7)
	}

`
