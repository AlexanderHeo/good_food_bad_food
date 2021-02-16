import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MobileFrame from './UI/Mobile-Frame';

const LoginSignup = props => {
  return (<>
    <MobileFrame test='testesetest123123'>
      {/* <div className="container">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center ls-icons">
            <div className="text-success">Good Food</div>
            <img className="" src="/images/angel.png" alt="" />
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-center align-items-center ls-icons">
            <div className="text-danger">Bad Food</div>
            <img className="" src="/images/devil.png" alt="" />
          </div>
        </div>
        <div className="col d-flex justify-content-around mt-5">
          <Link className="halfButton text-center" to="/login">Log In</Link>
          <Link className="halfButton text-center" to="/signup">Sign Up</Link>
        </div>
      </div> */}
      <Container>
        <div className="main">
          <div className="app-logo">
            <h1 className="title">Good Food<br/>Bad Food</h1>
          </div>
          <div className="button-container">
            <Link className="button" to="/login">Log In</Link>
            <Link className="button" to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </MobileFrame>
  </>);
};

export default LoginSignup;

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-color: var(--primary-6);
	border: 18px solid var(--primary-6);
	border-radius: 32px;
	display: flex;
	justify-content: center;
	align-items: center;

	.main {
		width: 100%;
		height: 100%;
		background-color: var(--gray-0);
		border-radius: 18px;
	}

	.app-logo {
		width: 100%;
		height: 75%;
		text-align: center;

		.title {
			font-size: 2.85rem;
			padding: 100px 0;
			@media (min-width: 375px) {
				font-size: 3.2rem;
			}
			@media (min-width: 375px) and (min-height: 668px) {
				font-size: 3.5rem;
			}
		}
	}

	.button-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.button {
			padding: 12px 24px;
			margin: 0 12px;
			border: 6px solid var(--primary-6);
			border-radius: 24px;
		}
		.button:hover,
		.button:active {
			background-color: var(--primary-6);
			color: var(--primary-0);
			cursor: pointer;
		}
	}
`
