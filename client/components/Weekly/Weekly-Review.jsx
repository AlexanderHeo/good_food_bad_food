import React, { Component } from 'react'
import styled from 'styled-components'

class WeeklyReview extends Component {
	state = {
	  weeklyReady: false,
	  sunReady: false,
	  monReady: false,
	  tueReady: false,
	  wedReady: false,
	  thuReady: false,
	  friReady: false,
	  satReady: false,
	  thisWeek: [
	    ['sun', ''],
	    ['mon', ''],
	    ['tue', ''],
	    ['wed', ''],
	    ['thu', ''],
	    ['fri', ''],
	    ['sat', '']
	  ],
	  sundaysDate: '',
	  month: '',
	  year: '',
	  highlight: ''
	}

	componentDidMount() {
	  this.doTheThing()
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevProps.list !== this.props.list) {
	    this.doTheThing()
	  }
	  if (prevProps.dateDisplay !== this.props.dateDisplay) {
	    this.doTheThing()
	  }
	  if (prevProps.dateSunday !== this.props.dateSunday) {
	    this.doTheThing()
	  }
	}

	doTheThing = () => {
	  const sunday = new Date(this.props.dateSunday.timestamp)
	  const sundayCopy = new Date(this.props.dateSunday.timestamp)
	  const oneWeek = sundayCopy.setHours(sunday.getHours() + (24 * 7))
	  const week = new Date(oneWeek)
	  const thisWeek = this.props.list.filter(x => {
	    const e = new Date(x.eatenAt)
	    if (week > e && e >= sunday) return x
	  })
	  const displayDay = this.props.dateDisplay.day
	  switch (displayDay) {
	    case 'Sunday':
	      this.setState({ highlight: displayDay })
	      break
	    case 'Monday':
	      this.setState({ highlight: displayDay })
	      break
	    case 'Tuesday':
	      this.setState({ highlight: displayDay })
	      break
	    case 'Wednesday':
	      this.setState({ highlight: displayDay })
	      break
	    case 'Thursday':
	      this.setState({ highlight: displayDay })
	      break
	    case 'Friday':
	      this.setState({ highlight: displayDay })
	      break
	    case 'Saturday':
	      this.setState({ highlight: displayDay })
	      break
	    default:
	      break
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
	        break
	      case 1:
	        mon.push(x)
	        break
	      case 2:
	        tue.push(x)
	        break
	      case 3:
	        wed.push(x)
	        break
	      case 4:
	        thu.push(x)
	        break
	      case 5:
	        fri.push(x)
	        break
	      case 6:
	        sat.push(x)
	        break
	    }
	  })

	  this.setState({
	    weeklyReady: true,
	    thisWeek: [
	      ['sun', sun],
	      ['mon', mon],
	      ['tue', tue],
	      ['wed', wed],
	      ['thu', thu],
	      ['fri', fri],
	      ['sat', sat]
	    ],
	    sunReady: true,
	    monReady: true,
	    tueReady: true,
	    wedReady: true,
	    thuReady: true,
	    friReady: true,
	    satReady: true
	  })
	}

	// handles Weekly Review Click to display previous day
	handleClick = (date, day) => {
	  const todaysDate = new Date(this.props.dateToday.timestamp)
	  const displayDate = new Date(date)
	  if (todaysDate >= displayDate) {
	    this.setState({ highlight: day })
	    this.props.handleClick(date, day)
	  }
	}

	render() {
	  let sun, mon, tue, wed, thu, fri, sat
	  switch (this.state.highlight) {
	    case 'Sunday':
	      sun = 'today'
	      break
	    case 'Monday':
	      mon = 'today'
	      break
	    case 'Tuesday':
	      tue = 'today'
	      break
	    case 'Wednesday':
	      wed = 'today'
	      break
	    case 'Thursday':
	      thu = 'today'
	      break
	    case 'Friday':
	      fri = 'today'
	      break
	    case 'Saturday':
	      sat = 'today'
	      break
	  }

	  const weekDates = []
	  const sunday = new Date(this.props.dateSunday.timestamp)
	  for (var i = 0; i < 7; i++) {
	    if (i === 0) {
	      const d = sunday.setHours(sunday.getHours())
	      const date = new Date(d)
	      weekDates.push(date)
	    } else {
	      const d = sunday.setHours(sunday.getHours() + 24)
	      const date = new Date(d)
	      weekDates.push(date)
	    }
	  }

	  return (
	    <Table>
	      {
	        this.state.weeklyReady &&
					<>
					  <thead className='tableHead'>
					    <tr className='tableRow'>
					      <th className={sun} onClick={ () => this.handleClick(weekDates[0], 'Sunday') }>Sun</th>
					      <th className={mon} onClick={ () => this.handleClick(weekDates[1], 'Monday') }>Mon</th>
					      <th className={tue} onClick={ () => this.handleClick(weekDates[2], 'Tuesday') }>Tue</th>
					      <th className={wed} onClick={ () => this.handleClick(weekDates[3], 'Wednesday') }>Wed</th>
					      <th className={thu} onClick={ () => this.handleClick(weekDates[4], 'Thursday') }>Thu</th>
					      <th className={fri} onClick={ () => this.handleClick(weekDates[5], 'Friday') }>Fri</th>
					      <th className={sat} onClick={ () => this.handleClick(weekDates[6], 'Saturday') }>Sat</th>
					    </tr>
					    <tr className='tableRow'>
					      <th className={sun} onClick={ () => this.handleClick(weekDates[0], 'Sunday') }>{ new Date(weekDates[0]).getDate()}</th>
					      <th className={mon} onClick={ () => this.handleClick(weekDates[1], 'Monday') }>{ new Date(weekDates[1]).getDate()}</th>
					      <th className={tue} onClick={ () => this.handleClick(weekDates[2], 'Tuesday') }>{ new Date(weekDates[2]).getDate()}</th>
					      <th className={wed} onClick={ () => this.handleClick(weekDates[3], 'Wednesday') }>{ new Date(weekDates[3]).getDate()}</th>
					      <th className={thu} onClick={ () => this.handleClick(weekDates[4], 'Thursday') }>{ new Date(weekDates[4]).getDate()}</th>
					      <th className={fri} onClick={ () => this.handleClick(weekDates[5], 'Friday') }>{ new Date(weekDates[5]).getDate()}</th>
					      <th className={sat} onClick={ () => this.handleClick(weekDates[6], 'Saturday') }>{ new Date(weekDates[6]).getDate()}</th>
					    </tr>
					  </thead>
					  <tbody className='tableBody'>
					    <tr className='tableRow'>
					      {
					        this.state.thisWeek.map((x, index) => {
					          const name = x[0]
					          let avg = 0
					          const ready = `${name}Ready`
					          if (ready) {
					            const reports = []
					            x[1].forEach(x => { if (x.report) reports.push(x.report) })
					            const total = reports.reduce((a, b) => a + b, 0)
					            avg = (total / reports.length).toFixed(2)
					            const avgSplit = avg.split('.')
					            if (avgSplit[1] === '00') {
					              avg = avgSplit[0]
					            }
					          }
					          if (isNaN(avg)) { avg = '' }
					          const weekDays = [sun, mon, tue, wed, thu, fri, sat]
					          const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
					          return <td className={ weekDays[index] } onClick={ () => this.handleClick(weekDates[index], weekNames[index]) } key={ name }>{ avg }</td>
					        })
					      }
					    </tr>
					  </tbody>
					</>
	      }
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
	border-radius: 12px;

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
		animation: colorFlip 0.4s forwards;
	}

	@keyframes colorFlip {
		from {
			background-color: var(--primary-0);
			color: var(--primary-6);
		}
		to {
			background-color: var(--primary-4);
			color: var(--primary-0);
		}
	}
`
