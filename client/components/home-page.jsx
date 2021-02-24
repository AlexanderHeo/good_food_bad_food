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
    list: [],
    listLoaded: false,
    todaysDate: '',
    displayDate: ''
  }

  componentDidMount() {
    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls')
        this.setState({ isLoading: false })
      })
      .catch(err => console.error(err))

    fetch('/api/list')
	    .then(response => response.json())
	    .then(result => {
        this.setState({
          list: result,
          listLoaded: true
        })
      })

    const today = new Date()
    const date = today.getDate()
    const month = today.getMonth() + 1

	  const todaysDate = dateFormatter(today)
    const displayDate = `${month} / ${date}`
    this.setState({
      todaysDate: todaysDate,
      displayDate: displayDate
    })
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleClick = event => {
    const { history } = this.props
    history.push(`/${event.target.name}`)
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

	updateList = list => {
	  this.setState({
	    list: list,
	    listLoaded: true
	  })
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
	        {
	          this.state.listLoaded
	            ? <TodaysMeals
	              list={ this.state.list }
	              updateList={ this.updateList }
	              todaysDate={ this.state.todaysDate }
	            />
	            : <Loader />
	        }
	      </section>
	      <section className='reviewSection'>
	        <div className='reviewTitle'>This Week</div>
	        {
	          this.state.listLoaded
	            ? <WeeklyReview
	              list={ this.state.list }
	            />
	            : <Loader />
	        }
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
