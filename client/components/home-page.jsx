import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './Loader';
import TodaysMeals from './Todays-Meals';

class HomePage extends Component {
  state = {
    isLoading: true,
    list: [],
    listLoaded: false,
    todaysList: []
  }

  componentDidMount() {
    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls');
        this.setState({ isLoading: false });
      })
      .catch(err => console.error(err));
    fetch('/api/list')
      .then(response => response.json())
      .then(result => {
        // const today = new Date()
        // const date = today.getDate()
        // let month = today.getMonth() + 1
        // const year = today.getFullYear()
        // if ((month.toString()).length < 2) {
        //   month = '0' + (month.toString())
        // }

        /* FOR TESTING PURPOSES */
        const todaysDate = '2021-02-18'
        // const todaysDate = `${year}-${month}-${date}`
        const todaysMeals = result.filter(x => x.eatenAt.slice(0, 10) === todaysDate)
        this.setState({
          list: result,
          listLoaded: true,
          todaysList: todaysMeals
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleClick = event => {
    const { history } = this.props;
    history.push(`/${event.target.name}`);
  }

  handleLogOut = () => {
    fetch('/api/log-out')
      .then(response => response.json())
      .then(result => {
        if (result.success) return this.props.history.push('/ls');
      })
      .catch(err => console.error(err));
  }

  render() {
	  if (this.state.isLoading) return <Spinner />;

	  return (
	    <Container>
	      <section className='helloSection'>
	        <div className='hello'>Hello, user!</div>
	      </section>
	      <section className='todaySection'>
	        <div className='todayTitle'>Today</div>
	        {
	          this.state.listLoaded
	            ? <TodaysMeals todaysMeals={ this.state.todaysList }/>
	            : <Spinner />
	        }
	        {/* <div
	          className='todayContainer'
	          id='todayContainer'
	          onClick={ this.handleSectionClick }>
	          <div className='mealContainer'>
	            <div className='breakfast meal'><span className='mealName' >Breakfast</span><span className='mealRating' ><div></div></span></div>
	            <div className='lunch meal' ><span className='mealName' >Lunch</span><span className='mealRating' ><div></div></span></div>
	            <div className='dinner meal' ><span className='mealName' >Dinner</span><span className='mealRating' ><div></div></span></div>
	            <div className='snacks meal' ><span className='mealName' >Snacks</span><span className='mealRating' ><div></div></span></div>
	          </div>
	        </div> */}
	      </section>
	      {/* <section className='reviewSection'>
	        <div className='reviewTitle'>Review</div>
	        <div
	          className='reviewContainer'
	          id='reviewContainer'
	          onClick={ this.handleSectionClick }></div>
	      </section>
	      <section className='actions'>

	      </section> */}
	    </Container>
	  );
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
		.todayTitle {
			font-size: 1.1rem;
			width: 100%;
			text-align: left;
		}

	}

	.reviewSection {
		height: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 10px solid dodgerblue;
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
`
