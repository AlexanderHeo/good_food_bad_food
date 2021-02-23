import React, { Component } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Loader from './Loader';
import Settings from './Settings';
import TodaysMeals from './Todays-Meals';
import WeeklyReview from './Weekly-Review';

class HomePage extends Component {
  state = {
    isLoading: true,
    hamburgerClicked: false,
    list: [],
    listLoaded: false
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
        this.setState({
          list: result,
          listLoaded: true
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

	handleFooterClick = () => {
	  this.setState({
	    hamburgerClicked: !this.state.hamburgerClicked
	  })
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
	  if (this.state.isLoading) return <Loader />;
    const username = this.props.location.state.username
	  return (
	    <Container>

	      <section className='helloSection'>
	        <div className='hello'>Hello, { username }!</div>
	      </section>
	      <section className='todaySection'>
	        <div className='todayTitle'>Today</div>
          {
            this.state.listLoaded
              ? <TodaysMeals list={ this.state.list } />
              : <Loader />
          }
	      </section>
	      <section className='reviewSection'>
	        <div className='reviewTitle'>This Week</div>
          {
            this.state.listLoaded
              ? <WeeklyReview list={ this.state.list } />
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

        <FooterContainer>
        	<Footer
            clicked={ this.state.hamburgerClicked }
            handleClick={ this.handleFooterClick }
          />
        </FooterContainer>
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
`
const FooterContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
`
