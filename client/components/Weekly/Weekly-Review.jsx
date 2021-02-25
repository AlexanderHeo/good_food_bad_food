import React, { Component } from 'react'
import styled from 'styled-components'

class WeeklyReview extends Component {

	state = {
	  weeklyReady: false,
	  thisWeek: [
	    ['sun', '', ''],
	    ['mon', '', ''],
	    ['tue', '', ''],
	    ['wed', '', ''],
	    ['thu', '', ''],
	    ['fri', '', ''],
	    ['sat', '', '']
	  ],
	  sundayDisplay: '',
	  today: '',
	  highlight: ''
	}

	componentDidMount() {

	  const thisWeek = []

	  const todayDate = new Date()
	  const todayDay = todayDate.getDay()
	  const todayDateNum = todayDate.getDate()
	  const sunday = todayDate.setHours(todayDate.getHours() - (todayDay * 24))
	  const sundayDate = new Date(sunday)
	  const sundayDates = sundayDate.getDate()
	  const sundayMonth = sundayDate.getMonth() + 1
	  const sundayYear = sundayDate.getFullYear()
	  const sundayFullDate = `${sundayMonth} ${sundayDates} ${sundayYear}`
	  const thisSunday = new Date(sundayFullDate)

	  for (let i = 0; i < this.props.list.length; i++) {
	    const eatenDate = new Date(this.props.list[i].eatenAt)
	    if (eatenDate >= thisSunday) {
	      thisWeek.push(this.props.list[i])
	    }
	  }

	  if (sundayDates === todayDateNum) {
	    this.setState({ highlight: 'sun' })
	  } else if (sundayDates + 1 === todayDateNum) {
	    this.setState({ highlight: 'mon' })
	  } else if (sundayDates + 2 === todayDateNum) {
	    this.setState({ highlight: 'tue' })
	  } else if (sundayDates + 3 === todayDateNum) {
	    this.setState({ highlight: 'wed' })
	  } else if (sundayDates + 4 === todayDateNum) {
	    this.setState({ highlight: 'thu' })
	  } else if (sundayDates + 5 === todayDateNum) {
	    this.setState({ highlight: 'fri' })
	  } else if (sundayDates + 6 === todayDateNum) {
	    this.setState({ highlight: 'sat' })
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
	    ],
	    sundayDisplay: sundayDates
	  })
	}

	render() {
	  let sun, mon, tue, wed, thu, fri, sat
	  switch (this.state.highlight) {
	    case 'sun':
	      sun = 'today'
	      break
	    case 'mon':
	      mon = 'today'
	      break
	    case 'tue':
	      tue = 'today'
	      break
	    case 'wed':
	      wed = 'today'
	      break
	    case 'thu':
	      thu = 'today'
	      break
	    case 'fri':
	      fri = 'today'
	      break
	    case 'sat':
	      sat = 'today'
	      break

	  }

	  return (
	    <Table>
	      <thead className='tableHead'>
	        <tr className='tableRow'>
	          <th className={sun}>Sun</th>
	          <th className={mon}>Mon</th>
	          <th className={tue}>Tue</th>
	          <th className={wed}>Wed</th>
	          <th className={thu}>Thu</th>
	          <th className={fri}>Fri</th>
	          <th className={sat}>Sat</th>
	        </tr>
	        <tr className='tableRow'>
	          <th className={sun}>{this.state.sundayDisplay}</th>
	          <th className={mon}>{this.state.sundayDisplay + 1}</th>
	          <th className={tue}>{this.state.sundayDisplay + 2}</th>
	          <th className={wed}>{this.state.sundayDisplay + 3}</th>
	          <th className={thu}>{this.state.sundayDisplay + 4}</th>
	          <th className={fri}>{this.state.sundayDisplay + 5}</th>
	          <th className={sat}>{this.state.sundayDisplay + 6}</th>
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
	                avg = (total / x[1].length).toFixed(2)
	                const avgSplit = avg.split('.')
	                if (avgSplit[1] === '00') {
	                  avg = avgSplit[0]
	                }
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

	.today {
		background-color: var(--primary-4);
		color: var(--primary-0);
	}
`
