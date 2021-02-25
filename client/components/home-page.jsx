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
    displayDate: '',
    list: [],
    listLoaded: false,
    breakfast: '',
	  lunch: '',
	  dinner: '',
	  snacks: '',
	  breakfastReady: false,
	  lunchReady: false,
	  dinnerReady: false,
	  snacksReady: false
  }

  componentDidMount() {

    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls')

        const today = new Date()
        const date = today.getDate()
        const month = today.getMonth() + 1

        const todaysDate = dateFormatter(today)
        const displayDate = `${month} / ${date}`
        this.setState({
          todaysDate: todaysDate,
          displayDate: displayDate
        })

        fetch('/api/list')
          .then(response => response.json())
          .then(result => {

            const todaysMeals = result.filter(x => {
              const eatenAtDate = new Date(x.eatenAt)
              const eatenAt = dateFormatter(eatenAtDate)

              return eatenAt === this.state.todaysDate
            })

            todaysMeals.forEach(x => {
              const mealtime = x.mealtime
              const ready = `${mealtime}Ready`
              this.setState({
                [ready]: true,
                [mealtime]: x
              })
            })

            this.setState({
              isLoading: false,
              list: result,
              listLoaded: true,
              todaysMeals: todaysMeals
            })
          })
      })
      .catch(err => console.error(err))
  }

	addMeal = (category, parameter) => {
	  if (category === 'food') {
	    const foodReady = `${parameter.food.mealtime}Ready`
	    const data = {
	      meal: parameter.food.name,
	      mealtime: parameter.food.mealtime
	    }
	    const patchData = {
	      name: parameter.food.name,
	      mealId: parameter.food.mealId
	    }
	    if (this.state.[foodReady]) {
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
	          listCopy[index].name = parameter.value
	          this.setState({ list: listCopy })
	        })
	    } else {
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
	          const listCopy = [...this.state.list]
	          listCopy.push(result.rows[0])
	          this.setState({
	            list: listCopy,
	            [parameter.mealtime]: result.rows[0],
	            [foodReady]: true
	          })
	        })
	    }

	  } else if (category === 'report') {
	    const mealId = parameter.food.mealId
	    const report = parameter.report

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
	          <span className='todayTitle'>Today</span>
	          <span className='todayDate'>{ this.state.displayDate }</span>
	        </div>
	        <TodaysMeals
            todaysDate={ this.state.todaysDate }
            breakfastReady={ this.state.breakfastReady }
            lunchReady={ this.state.lunchReady }
            dinnerReady={ this.state.dinnerReady }
            snacksReady={ this.state.snacksReady }
            breakfast={ this.state.breakfast }
            lunch={ this.state.lunch }
            dinner={ this.state.dinner }
            snacks={ this.state.snacks }
            addMeal={ this.addMeal }
          />
	      </section>
	      <section className='reviewSection'>
	        <div className='reviewTitle'>This Week</div>
	        <WeeklyReview
            list={ this.state.list }
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
