import React, { Component } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Spinner from './Loader';
import Settings from './Settings';
import TodaysMeals from './Todays-Meals';
import WeeklyReview from './Weekly-Review';

class HomePage extends Component {
  state = {
    isLoading: true,
    hamburgerClicked: false
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

	handleBDClick = () => {
	  this.setState({
	    hamburgerClicked: !this.state.hamburgerClicked
	  })
	}

	handleFooterClick = e => {
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

        <section className={ this.state.hamburgerClicked ? `${'settingsSection'} ${'clicked'}` : 'settingsSection' }
        >
          <Settings
            clicked={ this.state.hamburgerClicked }
            handleClick={ this.handleBDClick } />
        </section>

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
		display: none;
		align-items: flex-end;
	}
	.settingsSection.clicked {
		display: flex;
	}
`
const FooterContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
`
