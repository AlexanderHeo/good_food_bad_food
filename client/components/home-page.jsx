import React, { Component } from 'react'
import styled from 'styled-components'
import dateFormatter from './Functions/Date-Formatter'
import Settings from './Settings/Settings'
import TodaysMeals from './Today/Todays-Meals'
import Footer from './UI/Footer'
import Loader from './UI/Loader'
import WeeklyReview from './Weekly/Weekly-Review'

class HomePage extends Component {
  state = {
    isLoading: true,
    hamburgerClicked: false,
    todaysDate: '',
    todaysDay: '',
    displayDate: '',
    list: [],
    listLoaded: false,
	  inFuture: false
  }

  componentDidMount() {

    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls')

        const today = new Date()
        const date = today.getDate()
        const dayNum = today.getDay()
        const month = today.getMonth() + 1

        const todaysDate = dateFormatter(today)
        const displayDate = `${month} / ${date}`
        this.getTodaysDay(dayNum)
        this.setState({
          todaysDate: todaysDate,
          displayDate: displayDate
        })

        fetch('/api/list')
          .then(response => response.json())
          .then(result => {

            this.setState({
              isLoading: false,
              list: result,
              listLoaded: true
            })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todaysDate !== this.state.todaysDate) {
      const dateSplit = this.state.todaysDate.split('-')
      const displayDate = `${dateSplit[1]} / ${dateSplit[2]}`
      this.setState({ displayDate: displayDate })
    }
    if (prevState.todaysDay !== this.state.todaysDay) {
      if (new Date(this.state.todaysDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
        this.setState({ inFuture: true })
      } else {
        this.setState({ inFuture: false })
      }
      this.setState({
        todaysDay: this.state.todaysDay
      })
    }
  }

	getTodaysDay = dayNum => {
	  switch (dayNum) {
	    case 0:
	      this.setState({ todaysDay: 'Sun' })
	      break
	    case 1:
	      this.setState({ todaysDay: 'Mon' })
	      break
	    case 2:
	      this.setState({ todaysDay: 'Tue' })
	      break
	    case 3:
	      this.setState({ todaysDay: 'Wed' })
	      break
	    case 4:
	      this.setState({ todaysDay: 'Thu' })
	      break
	    case 5:
	      this.setState({ todaysDay: 'Fri' })
	      break
	    case 6:
	      this.setState({ todaysDay: 'Sat' })
	      break
	  }
	}

	addMeal = (category, parameter) => {
	  if (category === 'food') {
	    const ready = parameter.ready
	    if (ready) {
	      const patchData = {
	        name: parameter.food.name,
	        mealId: parameter.food.mealId,
	        enterDate: parameter.enterDate
	      }
	      const init = {
	        method: 'PATCH',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(patchData)
	      }
	      fetch(`/api/enter/${parameter.food.mealId}`, init)
	        .then(response => response.json())
	        .then(result => {
	          const listCopy = [...this.state.list]
	          const arrOfIds = listCopy.map(x => x.mealId)
	          const index = arrOfIds.indexOf(parameter.food.mealId)
	          listCopy[index].name = parameter.food.name
	          this.setState({ list: listCopy })
	        })
	    } else {
	      const data = {
	        meal: parameter.food.name,
	        mealtime: parameter.mealtime,
	        enterDate: this.state.todaysDate
	      }
	      const init = {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	      }
	      fetch('/api/enter', init)
	        .then(response => response.json())
	        .then(result => {
	          result.mealtime = parameter.mealtime
	          const listCopy = [...this.state.list]
	          listCopy.push(result)
	          this.setState({
	            list: listCopy
	          })
	        })
	    }

	  } else if (category === 'report') {
	    const mealId = parameter.food.mealId
	    const report = parseInt(parameter.report)

	    const mealResult = {
	      mealId, report
	    }
	    const init = {
	      method: 'PATCH',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(mealResult)
	    }
	    fetch(`/api/rate/${mealId}`, init)
	      .then(response => response.json())
	      .then(data => {
	        const listCopy = [...this.state.list]
	        for (let i = 0; i < listCopy.length; i++) {
	          if (listCopy[i].mealId === mealId) {
	            listCopy[i].report = report
	            this.setState({ list: listCopy })
	          }
	        }
	      })
	  }
	}

	handleWeeklyClick = (date, day) => {
	  this.setState({
	    todaysDate: date,
	    todaysDay: day
	  })
	}

	handleFooterClick = () => {
	  this.setState({
	    hamburgerClicked: !this.state.hamburgerClicked
	  })
	}

  handleLogOut = () => {
    fetch('/api/log-out')
      .then(response => response.json())
      .then(result => {
        if (result.success) return this.props.history.push('/ls')
      })
      .catch(err => console.error(err));
  }

  render() {
	  if (this.state.isLoading) return <Loader />;
	  const username = this.props.location.state.username
	  return (
	    <Container>

	      <section className='helloSection'>
	        <div className='hello'>Hello, { username }!</div>
	      </section>
	      <section className='todaySection'>
	        <div className='todayTitleContainer'>
	          <span className='todayTitle'>{ this.state.todaysDay }</span>
	          <span className='todayDate'>{ this.state.displayDate }</span>
	        </div>
	        <TodaysMeals
            list={ this.state.list }
            addMeal={ this.addMeal }
            todaysDate={ this.state.todaysDate }
          />
	      </section>
	      <section className='reviewSection'>
	        <div className='reviewTitle'>This Week</div>
	        <WeeklyReview
            list={ this.state.list }
            handleClick={ this.handleWeeklyClick }
          />
	      </section>

	      {
	        this.state.hamburgerClicked &&
						<section className={ this.state.hamburgerClicked ? `${'settingsSection'} ${'open'}` : `${'settingsSection'} ${'closed'}` }
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
		.reviewTitle {
			font-size: 1.2rem;
			width: 100%;
			text-align: left;
		}
		.reviewContainer {
			width: 80%;
			height: 70%;
			border: 5px solid red;
			margin-top: 5px;
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
