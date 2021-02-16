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
	border: 25px solid var(--primary-6);
	border-radius: 30px;
	display: flex;
	justify-content: center;
	align-items: center;

	.main {
		width: 100%;
		height: 100%;
		background-color: var(--gray-0);
		border-radius: 20px;
	}

	.app-logo {
		width: 100%;
		height: 85%;
		text-align: center;
		.title {
			padding: 50px 0;
		}
	}

	.button-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.button {
			padding: 10px 20px;
			margin: 0 10px;
			border: 5px solid var(--primary-6);
			border-radius: 25px;
		}
	}
`
