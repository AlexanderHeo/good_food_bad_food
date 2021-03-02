import React, { Component } from 'react';
import styled from 'styled-components';
import { dateFormatter, sundayFormatter } from './Functions/date';
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
	  listLoaded: false
	}

	async componentDidMount() {
	  this._isMounted = true
	  const response = await fetch('/api/isloggedin')
	  const json = await response.json()
	  if (json.error) return this.props.history.push('/ls')
	  if (this._isMounted) {
	    this.setTime()
	    this.setState({
	      isLoggedIn: true
	    })
	  }
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevState.isLoggedIn !== this.state.isLoggedIn) {
	    this.getList()
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
	    dateToday: newDate,
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

	  if (action === 'previousWeek') {
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
	    const nextSunday = new Date(next)
	    const nextSundayState = sundayFormatter(nextSunday)
	    const todaysSunday = sundayFormatter(this.state.dateToday)
	    if (nextSundayState.fullDate === todaysSunday.fullDate) {
	      this.setTime()
	      this.setState({ })
	    } else {
	      this.setState({
	        dateDisplay: nextSundayState,
	        dateSunday: nextSundayState
	      })
	    }
	  }
	}

  handleFooterClick = () => {
    this.setState({ hamburgerClicked: !this.state.hamburgerClicked })
  }

  handleLogOut = () => {
    fetch('/api/log-out')
      .then(response => response.json())
      .then(result => {
        if (result.success) return this.props.history.push('/ls')
      })
      .catch(err => console.error(err));
  }

	addMeal = (category, parameter, isToday) => {
	  if (category === 'food') {
	    // console.log('food:')
	    // console.log(parameter.meal, parameter.mealtime, isToday)
	  } else if (category === 'foodPatch') {
	    // console.log('foodPatch:', parameter, isToday)
	  } else if (category === 'rating') {
	    // console.log('rating:', parameter, isToday)
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
	              <span style={{ textTransform: 'capitalize' }} className='todayTitle'>{ this.state.dateDisplay.day }</span>
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
  					  dateSunday={ this.state.dateSunday }
  					  handleClick={ this.handleWeeklyClick }
  					  previousWeek={ this.state.previousWeek }
  					/>
	        }
	      </section>

	      {
	        this.state.hamburgerClicked &&
  					<section className={ this.state.hamburgerClicked ? `${'section settingsSection open'}` : `${'section settingsSection closed'}` }
  					>
  					  <Settings
  					    clicked={ this.state.hamburgerClicked }
  					    handleClick={ this.handleFooterClick }
  					    logout={ this.handleLogOut } />
  					</section>
	      }

	      <div className='footer'>
        	<Footer
	          clicked={ this.state.hamburgerClicked }
	          handleClick={ this.handleFooterClick }
	        />
	      </div>
	    </Container>
	  )
	}

  // addMeal = (category, parameter) => {
  //   if (category === 'food') {
  //     const ready = parameter.ready
  //     if (ready) {
  //       const patchData = {
  //         name: parameter.food.name,
  //         mealId: parameter.food.mealId,
  //         enterDate: parameter.enterDate
  //       }
  //       const init = {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(patchData)
  //       }
  //       fetch(`/api/enter/${parameter.food.mealId}`, init)
  //         .then(response => response.json())
  //         .then(result => {
  //           const listCopy = [...this.state.list]
  //           const arrOfIds = listCopy.map(x => x.mealId)
  //           const index = arrOfIds.indexOf(parameter.food.mealId)
  //           listCopy[index].name = parameter.food.name
  //           this.setState({ list: listCopy })
  //         })
  //     } else {
  //       const data = {
  //         meal: parameter.food.name,
  //         mealtime: parameter.mealtime,
  //         enterDate: this.state.todaysDate
  //       }
  //       const init = {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //       }
  //       fetch('/api/enter', init)
  //         .then(response => response.json())
  //         .then(result => {
  //           result.mealtime = parameter.mealtime
  //           const listCopy = [...this.state.list]
  //           listCopy.push(result)
  //           this.setState({
  //             list: listCopy
  //           })
  //         })
  //     }
  //   } else if (category === 'rating') {
  //     const mealId = parameter.food.mealId
  //     const report = parseInt(parameter.report)
  //     const mealResult = {
  //       mealId, report
  //     }
  //     const init = {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(mealResult)
  //     }
  //     fetch(`/api/rate/${mealId}`, init)
  //       .then(response => response.json())
  //       .then(data => {
  //         const listCopy = [...this.state.list]
  //         for (let i = 0; i < listCopy.length; i++) {
  //           if (listCopy[i].mealId === mealId) {
  //             listCopy[i].report = report
  //             this.setState({ list: listCopy })
  //           }
  //         }
  //       })
  //   } else if (category === 'patchName') {
  //     // *********************** //
  //     // *********************** //
  //     // *********************** //
  //     const name = parameter.food.name
  //     const mealId = parameter.food.mealId
  //     const mealToPatch = {
  //       mealId, name
  //     }
  //     const init = {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(mealToPatch)
  //     }
  //     fetch(`/api/list/${mealId}`, init)
  //       .then(response => response.json())
  //       .then(data => {
  //         const listCopy = [...this.state.list]
  //         const index = listCopy.filter((x, index) => {
  //           if (x.mealId === mealId) return index
  //         })
  //         listCopy.splice(index, 1, data)
  //         this.setState({ list: listCopy })
  //       })
  //   }
  // }
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
