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
	  highlight: '',
	  mealHighlights: {
	    sunHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    monHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    tueHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    wedHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    thuHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    friHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    satHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    }
	  }
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

	  const allWeek = [sun, mon, tue, wed, thu, fri, sat]
	  const mealHighlights = {
	    sunHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    monHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    tueHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    wedHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    thuHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    friHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    },
	    satHighlight: {
	      b: {
	        entered: false,
	        rated: false
	      },
	      l: {
	        entered: false,
	        rated: false
	      },
	      d: {
	        entered: false,
	        rated: false
	      },
	      s: {
	        entered: false,
	        rated: false
	      }
	    }
	  }

	  allWeek.forEach(x => {
	    x.forEach(z => {
	      let entered, rated
	      if (z.name) entered = true
	      if (z.report) rated = true
	      const dayNum = new Date(z.eatenAt).getDay()
	      const mealtime = z.mealtime
	      switch (dayNum) {
	        case 0:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.sunHighlight.b.entered = entered
	              mealHighlights.sunHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.sunHighlight.l.entered = entered
	              mealHighlights.sunHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.sunHighlight.d.entered = entered
	              mealHighlights.sunHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.sunHighlight.s.entered = entered
	              mealHighlights.sunHighlight.s.rated = rated
	              break
	          }
	          break
	        case 1:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.monHighlight.b.entered = entered
	              mealHighlights.monHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.monHighlight.l.entered = entered
	              mealHighlights.monHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.monHighlight.d.entered = entered
	              mealHighlights.monHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.monHighlight.s.entered = entered
	              mealHighlights.monHighlight.s.rated = rated
	              break
	          }
	          break
	        case 2:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.tueHighlight.b.entered = entered
	              mealHighlights.tueHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.tueHighlight.l.entered = entered
	              mealHighlights.tueHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.tueHighlight.d.entered = entered
	              mealHighlights.tueHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.tueHighlight.s.entered = entered
	              mealHighlights.tueHighlight.s.rated = rated
	              break
	          }
	          break
	        case 3:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.wedHighlight.b.entered = entered
	              mealHighlights.wedHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.wedHighlight.l.entered = entered
	              mealHighlights.wedHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.wedHighlight.d.entered = entered
	              mealHighlights.wedHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.wedHighlight.s.entered = entered
	              mealHighlights.wedHighlight.s.rated = rated
	              break
	          }
	          break
	        case 4:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.thuHighlight.b.entered = entered
	              mealHighlights.thuHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.thuHighlight.l.entered = entered
	              mealHighlights.thuHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.thuHighlight.d.entered = entered
	              mealHighlights.thuHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.thuHighlight.s.entered = entered
	              mealHighlights.thuHighlight.s.rated = rated
	              break
	          }
	          break
	        case 5:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.friHighlight.b.entered = entered
	              mealHighlights.friHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.friHighlight.l.entered = entered
	              mealHighlights.friHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.friHighlight.d.entered = entered
	              mealHighlights.friHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.friHighlight.s.entered = entered
	              mealHighlights.friHighlight.s.rated = rated
	              break
	          }
	          break
	        case 6:
	          switch (mealtime) {
	            case 'breakfast':
	              mealHighlights.satHighlight.b.entered = entered
	              mealHighlights.satHighlight.b.rated = rated
	              break
	            case 'lunch':
	              mealHighlights.satHighlight.l.entered = entered
	              mealHighlights.satHighlight.l.rated = rated
	              break
	            case 'dinner':
	              mealHighlights.satHighlight.d.entered = entered
	              mealHighlights.satHighlight.d.rated = rated
	              break
	            case 'snacks':
	              mealHighlights.satHighlight.s.entered = entered
	              mealHighlights.satHighlight.s.rated = rated
	              break
	          }
	          break
	      }
	    })
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
	    satReady: true,
	    mealHighlights: mealHighlights
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

	  const entered = ''
	  const rated = ''
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
					    <tr className='mealHighlight'>
					      <td className='mealInitialContainer sun'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					      <td className='mealInitialContainer mon'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					      <td className='mealInitialContainer tue'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					      <td className='mealInitialContainer wed'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					      <td className='mealInitialContainer thu'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					      <td className='mealInitialContainer fri'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					      <td className='mealInitialContainer sat'>
					        <span className={`mealInitial breakfast ${entered} ${rated}`}>B</span>
					        <span className={`mealInitial lunch ${entered} ${rated}`}>L</span>
					        <span className={`mealInitial dinner ${entered} ${rated}`}>D</span>
					        <span className={`mealInitial snacks ${entered} ${rated}`}>S</span>
					      </td>
					    </tr>
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
					          return (
					            <td
					              className={ `${weekDays[index]} rating` }
					              onClick={ () => this.handleClick(weekDates[index], weekNames[index]) }
					              key={ name }>{ avg }
					            </td>
					          )
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

	.tableHead tr:first-of-type th {
		padding-top: 6px;
	}
	.tableHead tr:last-of-type th {
		padding-bottom: 2px;
	}
	.tableBody tr td {
		padding: 12px 0;
	}
	.tableRow td, .tableRow th {
		width: calc(100vw - 24px / 7)
	}

	.today {
		animation: colorFlip 0.4s forwards;
	}

	.tableBody .mealHighlight {
		td, th { padding: 0; }
			.mealInitial {
				padding: 0 1px;
				border: 1px solid var(--primary-1);
				color: var(--primary-1);
				background-color: var(--gray-0);
			}
		}
	}

	.mealInitialContainer .mealInitial.entered {
		border: 1px solid var(--primary-4);
		color: var(--primary-4);
	}

	.mealInitialContainer .mealInitial.rated {
		border: 1px solid var(--primary-0);
		color: var(--primary-0);
		background-color: var(--primary-6);
	}

	.rating {
		font-size: 1.2rem;
		font-weight: 500;
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
