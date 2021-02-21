import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './Loader';
import TodaysMeals from './Todays-Meals';
import WeeklyReview from './Weekly-Review';

class HomePage extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    fetch('/api/isloggedin')
      .then(response => response.json())
      .then(result => {
        if (result.error) return this.props.history.push('/ls');
        this.setState({ isLoading: false });
      })
      .catch(err => console.error(err));
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
	        <TodaysMeals />
	      </section>
	      <section className='reviewSection'>
	        <div className='reviewTitle'>This Week</div>
	        <WeeklyReview />
	      </section>
	      {/* <section className='actions'>

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
`
