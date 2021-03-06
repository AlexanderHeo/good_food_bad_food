import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import MobileFrame from '../UI/Mobile-Frame';

class Logo extends Component {
	state = {
	  fadeout: false,
	  login: false
	}

	componentDidMount = () => {
	  this._isMounted = true
	  if (this._isMounted) {
	    setTimeout(() => this.setState({ fadeout: true }), 900)
	    setTimeout(() => this.setState({ login: true }), 2000)
	  }
	}

	componentWillUnmount = () => {
	  this._isMounted = false
	}

	render() {
	  return (
	    <MobileFrame>
	      <Container>
	        <div className={this.state.fadeout ? `${'main'} ${'start'}` : 'main'}>
	          <div className="app-logo">
	            <h1 className='title'>Good Food</h1>
	          </div>
	          <div className="app-logo">
	            <h1 className='title'>Bad Food</h1>
	          </div>
	        </div>
	        {
	          this.state.login
	            ? <Redirect to={{ pathname: '/login' }}/>
	            : null
	        }
	      </Container>
	    </MobileFrame>
	  );
	}
}

export default Logo;

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-color: var(--primary-6);
	border: 18px solid var(--primary-6);
	border-radius: 32px;

	.main {
		height: 100%;
		background-color: var(--primary-0);
		border-radius: 18px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.app-logo {
		height: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.app-logo .title {
		font-size: 3.5rem;
	}

	.main.start {
		animation: fadeout 0.5s forwards;
	}
	@keyframes fadeout {
		to { opacity: 0; }
	}
`
