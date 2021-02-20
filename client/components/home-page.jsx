import React, { Component } from 'react';
import styled from 'styled-components';
import dateFormatter from './Date-Formatter';
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
        const today = new Date()
        const todaysDate = dateFormatter(today)

        const todaysMeals = result.filter(x => {
          const eatenAtDate = new Date(x.eatenAt)
          const eatenAt = dateFormatter(eatenAtDate)

          return eatenAt === todaysDate
        })
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
