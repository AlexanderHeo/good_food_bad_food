import React, { Component } from 'react';
import styled from 'styled-components';
import { dateFormatter, sundayFormatter } from './Functions/date';
import Lists from './Lists/Lists';
import Settings from './Settings/Settings';
import TodaysMeals from './Today/Todays-Meals';
import Footer from './UI/Footer';
import WeeklyReview from './Weekly/Weekly-Review';

class HomePage extends Component {
	state = {
	  isLoggedIn: false,
	  dateToday: '',
	  dateDisplay: '',
	  dateSunday: '',
	  dateSet: false,
	  previousWeek: false,
	  list: [],
	  listLoaded: false,
	  isToday: '',
	  isFuture: '',
	  listButtonClicked: true,
	  hamburgerClicked: false
	}

	async componentDidMount() {
	  this._isMounted = true
	  const response = await fetch('/api/isloggedin')
	  const json = await response.json()
	  if (json.error) return this.props.history.push('/ls')
	  if (this._isMounted) {
	    this.setTime()
	    this.setState({ isLoggedIn: true })
	  }
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevState.isLoggedIn !== this.state.isLoggedIn) {
	    this.getList()
	  }
	  if (prevState.dateDisplay !== this.state.dateDisplay) {
	    const isToday = this.state.dateToday.fullDate === this.state.dateDisplay.fullDate
	    let isFuture
	    if (this.state.dateToday.fullDate < this.state.dateDisplay.fullDate) {
	      isFuture = this.state.dateDisplay.fullDate
	    }
	    this.setState({ isToday: isToday, isFuture: isFuture })
	  }
	}

	componentWillUnmount = () => {
	  this._isMounted = false
	}

	setTime = () => {
	  // ************************* //
	  // testing only testing only //

	  // const fri = '2021-02-26 00:00:00'
	  // const newDate = new Date(fri)
	  const newDate = new Date()

	  // ************************* //

	  // send newDate to be formatted to helper functions
	  const displayDateState = dateFormatter(newDate)
	  const displaySundayState = sundayFormatter(newDate)

	  this.setState({
	    dateToday: displayDateState,
	    dateDisplay: displayDateState,
	    dateSunday: displaySundayState,
	    dateSet: true,
	    previousWeek: false
	  })
	}

	async getList() {
	  const listRes = await fetch('/api/list')
	  const listJSON = await listRes.json()
	  if (this._isMounted) {
	    this.setState({
	      list: listJSON,
	      listLoaded: true
	    })
	  }
	}

	handleWeeklyClick = (date, day) => {
	  const displayDateState = dateFormatter(date)
	  const displaySundayState = sundayFormatter(date)

	  this.setState({
	    dateDisplay: displayDateState,
	    dateSunday: displaySundayState
	  })
	}

	handleButtonClick = e => {
	  e.preventDefault()
	  const action = e.currentTarget.name
	  if (action === 'today') {
	    this.setTime()
	  } else if (action === 'list') {
	    this.setState({ listButtonClicked: !this.state.listButtonClicked })
	  } else if (action === 'hamburger') {
	    this.setState({ hamburgerClicked: !this.state.hamburgerClicked })
	  } else if (action === 'previousWeek') {
	    const sunday = this.state.dateSunday.timestamp
	    const prev = sunday.setHours(
	      sunday.getHours() - (24 * 7)
	    )
	    const previousSunday = new Date(prev)
	    const previousSundayState = sundayFormatter(previousSunday)
	    this.setState({
	      previousWeek: true,
	      dateDisplay: previousSundayState,
	      dateSunday: previousSundayState
	    })
	  } else if (action === 'nextWeek') {
	    const sunday = this.state.dateSunday.timestamp
	    const next = sunday.setHours(
	      sunday.getHours() + (24 * 7)
	    )
	    const nextSundayState = sundayFormatter(new Date(next))
	    const todaysSunday = sundayFormatter(new Date(this.state.dateToday.timestamp))
	    if (nextSundayState.fullDate === todaysSunday.fullDate) {
	      this.setTime()
	    } else {
	      this.setState({
	        dateDisplay: nextSundayState,
	        dateSunday: nextSundayState
	      })
	    }
	  }
	}

  handleLogOut = () => {
    fetch('/api/log-out')
      .then(response => response.json())
      .then(result => {
        if (result.success) return this.props.history.push('/ls')
      })
      .catch(err => console.error(err));
  }

	addMeal = (category, parameter) => {

	  if (category === 'food') {
	    const postData = {
	      meal: parameter.meal,
	      mealtime: parameter.mealtime,
	      isToday: this.state.isToday,
	      enterDate: parameter.enterDate
	    }
	    const init = {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(postData)
	    }
	    fetch('/api/enter', init)
	      .then(response => response.json())
	      .then(data => {
	        const listCopy = [...this.state.list]
	        listCopy.push(data)
	        this.setState({ list: listCopy })
	      })
	  } else if (category === 'rating') {
	    const { mealId, report } = parameter.food
	    const reportData = { report: parseInt(report), mealId }
	    const init = {
	      method: 'PATCH',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(reportData)
	    }
	    fetch(`/api/rate/${mealId}`, init)
	      .then(response => response.json())
	      .then(data => {
	        const listCopy = [...this.state.list]
	        for (let i = 0; i < listCopy.length; i++) {
	          if (listCopy[i].mealId === mealId) {
	            listCopy[i].report = parseInt(report)
	            this.setState({ list: listCopy })
	          }
	        }
	      })
	      .catch(error => console.error(error))
	  } else if (category === 'foodPatch') {
	    const { mealId, name } = parameter.food
	    const patchData = { name, mealId }
	    const init = {
	      method: 'PATCH',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(patchData)
	    }
	    fetch(`/api/enter/${mealId}`, init)
	      .then(response => response.json())
	      .then(data => {
	        const listCopy = [...this.state.list]
	        const arrOfIds = listCopy.map(x => x.mealId)
	        const index = arrOfIds.indexOf(mealId)
	        listCopy[index].name = name
	        this.setState({ list: listCopy })
	      })
	  } else if (category === 'delete') {
	    const mealId = parameter
	    const init = {
	      method: 'DELETE',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    }
	    fetch(`/api/enter/${mealId}`, init)
	      .then(response => null)
	      .then(data => {
	        const listCopy = [...this.state.list]
	        const index = listCopy.findIndex(x => x.mealId === mealId)
	        listCopy.splice(index, 1)
	        this.setState({ list: listCopy })
	      })
	  }
	}

	render() {
	  const username = this.props.location.state.username
	  return (
	    <Container>
	      <section className='section helloSection'>
	        <div className='hello'>Hello, { username }!</div>
	      </section>
	      <section className='section todaySection'>
	        {
	          this.state.dateSet
	            ? <div className='todayTitleContainer'>
	              {
	                this.state.isToday
	                  ? <span className='todayTitle'>Today</span>
	                  : <span
	                    style={{ textTransform: 'capitalize' }}
	                    className='todayTitle'
	                  >{ this.state.dateDisplay.day }</span>
	              }
	              <span className='todayDate'>{ this.state.dateDisplay.display }</span>
          	</div>
	            : <span className='todayTitleContainer'>date loading...</span>
	        }
	        {
	          this.state.listLoaded &&
  					<TodaysMeals
  					  list={ this.state.list }
  					  dateDisplay={ this.state.dateDisplay }
  					  todaysDate={ this.state.dateToday }
  					  addMeal={ this.addMeal }
  					/>
	        }
	      </section>
	      <section className='section reviewSection'>
	        <div className='reviewTitleContainer'>
	          <button
	            className='previousWeekButton'
	            name='previousWeek'
	            onClick={ this.handleButtonClick }
	          ><span className="iconify" data-icon="akar-icons:chevron-left" data-inline="false"></span></button>
          	<div className='reviewTitle'>
	            {
	              this.state.previousWeek
	                ?	<span>Last Week</span>
	                :	<span>This Week</span>
	            }
	          </div>
	          {
	            <button
	              className={ this.state.previousWeek ? 'nextWeekButton displayed' : 'nextWeekButton'}
	              name='nextWeek'
	              onClick={ this.handleButtonClick }
	              disabled={ !this.state.previousWeek}
	            ><span className="iconify" data-icon="akar-icons:chevron-right" data-inline="false"></span></button>
	          }
	        </div>
	        {
	          this.state.listLoaded &&
  					<WeeklyReview
  					  list={ this.state.list }
  					  dateDisplay={ this.state.dateDisplay }
  					  dateToday={ this.state.dateToday }
  					  dateSunday={ this.state.dateSunday }
  					  handleClick={ this.handleWeeklyClick }
  					  previousWeek={ this.state.previousWeek }
  					  isFuture={ this.state.isFuture }
  					/>
	        }
	      </section>
	      {
	        this.state.hamburgerClicked &&
  					<section className={ this.state.hamburgerClicked ? 'section settingsSection open' : 'section settingsSection closed' }
  					>
  					  <Settings
  					    clicked={ this.state.hamburgerClicked }
  					    handleClick={ this.handleButtonClick }
  					    logout={ this.handleLogOut } />
  					</section>
	      }
	      {
	        this.state.listButtonClicked &&
					<section className={ this.state.listButtonClicked ? 'lists open' : 'lists closed' }
					>
					  <Lists />
					</section>
	      }
	      <div className='footer'>
        	<Footer
	          isToday={ this.state.isToday }
	          clicked={ this.state.hamburgerClicked }
	          handleClick={ this.handleButtonClick }
	        />
	      </div>
	    </Container>
	  )
	}
}

export default HomePage;

const Container = styled.div`
	width: 100vw;
	height: 100vh;

	.helloSection {
		width: 100%;
		height: 15%;
		.hello {
			font-size: 2rem;
			padding: 15px 25px;
		}
	}

	.todaySection {
		height: 40%;
		display: flex;
		padding: 6px 12px;
		flex-direction: column;
		align-items: center;
		.todayTitleContainer {
			width: 100%;
			padding: 0 12px;
			display: flex;
			justify-content: space-between;
			font-size: 1.1rem;
		}
	}

	.reviewSection {
		padding: 36px 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.reviewTitleContainer {
			width: 100%;
			display: flex;
			justify-content: left;
			.previousWeekButton {
				width: 40px;
				height: 25px;
				border: none;
				border-radius: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.2rem;
			}
			.nextWeekButton {
				width: 40px;
				height: 25px;
				outline: none;
				border: none;
				background-color: #fff;
				* {
					display: none;
				}
			}
			.displayed {
				display: flex;
				border-radius: 12px;
				justify-content: center;
				align-items: center;
				font-size: 1.2rem;
				background-color: var(--primary-0);
				* {
					display: inherit;
				}
			}
			.reviewTitle {
				font-size: 1.2rem;
				width: calc(100% - 30px);
				text-align: center;
			}
		}
	}

	.settingsSection {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100% - 80px);
		align-items: flex-end;
	}
	.settingsSection.open {
		display: flex;
	}
	.settingsSection.closed {
		display: none;
	}
	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
	}
`
