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
	    ['sun', '', ''],
	    ['mon', '', ''],
	    ['tue', '', ''],
	    ['wed', '', ''],
	    ['thu', '', ''],
	    ['fri', '', ''],
	    ['sat', '', '']
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
	}

	doTheThing = () => {
	  const thisWeek = []

	  const todayDate = new Date()
	  const todayDay = todayDate.getDay()
	  let todayDateNum = todayDate.getDate()
	  if (todayDateNum.toString().length === 1) {
	    todayDateNum = `0${todayDateNum}`
	  }
	  let todayMonth = todayDate.getMonth()
	  if (todayMonth.toString().length === 1) {
	    todayMonth = `0${todayMonth + 1}`
	  }
	  const todayYear = todayDate.getFullYear()

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

	  thisWeek.forEach(x => {
	    const dayNum = (new Date(x.eatenAt)).getDay()
	    switch (dayNum) {
	      case 0:
	        sun.push(x)
	        this.setState({ sunReady: true })
	        break
	      case 1:
	        mon.push(x)
	        this.setState({ monReady: true })
	        break
	      case 2:
	        tue.push(x)
	        this.setState({ tueReady: true })
	        break
	      case 3:
	        wed.push(x)
	        this.setState({ wedReady: true })
	        break
	      case 4:
	        thu.push(x)
	        this.setState({ thuReady: true })
	        break
	      case 5:
	        fri.push(x)
	        this.setState({ friReady: true })
	        break
	      case 6:
	        sat.push(x)
	        this.setState({ satReady: true })
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
	    sundaysDate: sundayDates,
	    month: todayMonth,
	    year: todayYear
	  })
	}

	handleClick = (date, day) => {
	  this.setState({ highlight: day.toLowerCase() })
	  this.props.handleClick(date, day)
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

	  const weekDates = []
	  if (this.state.weeklyReady) {
	    for (let i = 0; i < 7; i++) {
	      weekDates.push(`${this.state.year}-${this.state.month}-${parseInt(this.state.sundaysDate) + i}`)
	    }
	  }
	  return (
	    <Table>
	      {
	        this.state.weeklyReady &&
					<>
					  <thead className='tableHead'>
					    <tr className='tableRow'>
					      <th className={sun} onClick={ () => this.handleClick(weekDates[0], 'Sun') }>Sun</th>
					      <th className={mon} onClick={ () => this.handleClick(weekDates[1], 'Mon') }>Mon</th>
					      <th className={tue} onClick={ () => this.handleClick(weekDates[2], 'Tue') }>Tue</th>
					      <th className={wed} onClick={ () => this.handleClick(weekDates[3], 'Wed') }>Wed</th>
					      <th className={thu} onClick={ () => this.handleClick(weekDates[4], 'Thu') }>Thu</th>
					      <th className={fri} onClick={ () => this.handleClick(weekDates[5], 'Fri') }>Fri</th>
					      <th className={sat} onClick={ () => this.handleClick(weekDates[6], 'Sat') }>Sat</th>
					    </tr>
					    <tr className='tableRow'>
					      <th className={sun} onClick={ () => this.handleClick(weekDates[0], 'Sun') }>{this.state.sundaysDate}</th>
					      <th className={mon} onClick={ () => this.handleClick(weekDates[1], 'Mon') }>{this.state.sundaysDate + 1}</th>
					      <th className={tue} onClick={ () => this.handleClick(weekDates[2], 'Tue') }>{this.state.sundaysDate + 2}</th>
					      <th className={wed} onClick={ () => this.handleClick(weekDates[3], 'Wed') }>{this.state.sundaysDate + 3}</th>
					      <th className={thu} onClick={ () => this.handleClick(weekDates[4], 'Thu') }>{this.state.sundaysDate + 4}</th>
					      <th className={fri} onClick={ () => this.handleClick(weekDates[5], 'Fri') }>{this.state.sundaysDate + 5}</th>
					      <th className={sat} onClick={ () => this.handleClick(weekDates[6], 'Sat') }>{this.state.sundaysDate + 6}</th>
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
					            x[1].forEach(x => {
					              if (x.report) reports.push(x.report)
					            })
					            const total = reports.reduce((a, b) => a + b, 0)
					            avg = (total / reports.length).toFixed(2)
					            const avgSplit = avg.split('.')
					            if (avgSplit[1] === '00') {
					              avg = avgSplit[0]
					            }
					          }
					          if (isNaN(avg)) { avg = '' }
					          return <td onClick={ () => this.handleClick(weekDates[index])} key={ name }>{ avg }</td>
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
