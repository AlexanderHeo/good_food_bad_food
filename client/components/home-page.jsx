import React, { Component } from 'react'
import styled from 'styled-components'
// import WeeklyReview from './Weekly/Weekly-Review'
import { dateFormatter, sundayFormatter } from './Functions/date'
import { todayDisplay } from './Functions/mealSetter'
import Settings from './Settings/Settings'
import TodaysMeals from './Today/Todays-Meals'
import Footer from './UI/Footer'

class HomePage extends Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    list: [],
    listLoaded: false,
    todayDisplay: {},
    todayDisplaySet: false,
    // weekDisplay: [],
    todayDate: {
      date: '',
      day: '',
      display: ''
    },
    sundayDate: {
      date: '',
      day: '',
      display: ''
    },
    dateSet: false,
    hamburgerClicked: false
  }

  componentDidMount() {

    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls')
        this.setState({ isLoggedIn: true })

        if (this.state.isLoggedIn) {
          this.setDate()
          fetch('/api/list')
            .then(response => response.json())
            .then(result => {

              this.setState({
                list: result,
                listLoaded: true
              })
            })
            .catch(err => console.error(err))
          if (this.state.listLoaded && this.state.dateSet) this.setMeals()
        }
      })
      .catch(err => console.error(err))
  }

	setDate = () => {
	  const newDate = new Date()
	  const todayDate = dateFormatter(newDate)
	  const sundayDate = sundayFormatter(newDate)
	  this.setState({
	    todayDate: todayDate,
	    sundayDate: sundayDate,
	    dateSet: true
	  })
	}

	setMeals = () => {
	  const todayDisplayState = todayDisplay(this.state.list, this.state.todayDate)
	  this.setState({
	    todayDisplay: todayDisplayState,
	    todayDisplaySet: true
	  })
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevState.list !== this.state.list) {
	    this.setState({ isLoading: true })
	    this.setMeals()
	  }
	}

	// componentDidUpdate(prevProps, prevState) {
	//   if (prevState.todaysDate !== this.state.todaysDate) {
	//     const dateSplit = this.state.todaysDate.split('-')
	//     const displayDate = `${dateSplit[1]} / ${dateSplit[2]}`
	//     this.setState({ displayDate: displayDate })
	//   }
	//   if (prevState.todaysDay !== this.state.todaysDay) {
	//     if (new Date(this.state.todaysDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
	//       this.setState({ inFuture: true })
	//     } else {
	//       this.setState({ inFuture: false })
	//     }
	//     this.setState({
	//       todaysDay: this.state.todaysDay
	//     })
	//   }
	// }

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

	//   } else if (category === 'report') {
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
	//   }
	// }

	// handleWeeklyClick = (date, day) => {
	//   this.setState({
	//     todaysDate: date,
	//     todaysDay: day
	//   })
	// }

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
	  // if (this.state.isLoading) return <Loading><Loader /></Loading>
    // const loading = <Loading><Loader /></Loading>
    const dateLoading = <span className='todayTitleContainer'>date loading...</span>
	  const username = this.props.location.state.username
	  return (
	    <Container>
	      <section className='helloSection'>
	        <div className='hello'>Hello, { username }!</div>
	      </section>
	      <section className='todaySection'>
          {
            this.state.dateSet
              ? <div className='todayTitleContainer'>
                <span style={{ textTransform: 'capitalize' }} className='todayTitle'>{ this.state.todayDate.day }</span>
                <span className='todayDate'>{ this.state.todayDate.display }</span>
          	</div>
              : dateLoading
          }
          {
            this.state.todayDisplaySet &&
						<TodaysMeals
						  todayDisplay={ this.state.todayDisplay }
						  todayDate={ this.state.todayDate }
						/>
          }
	      </section>
	      <section className='reviewSection'>
	        <div className='reviewTitle'>This Week</div>
	        {/* <WeeklyReview
            list={ this.state.list }
            handleClick={ this.handleWeeklyClick }
          /> */}
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

	.todaySection, .reviewSection {
		border: 1px solid dodgerblue;
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
// const Loading = styled.div`
// 	width: 100vw;
// 	height: 100vh;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// `
