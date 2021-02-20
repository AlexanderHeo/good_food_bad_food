import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MobileFrame from './UI/Mobile-Frame';

const LoginSignup = props => {
  return (
    <MobileFrame>
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
  );
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
			@media (min-width: 321px) {
				font-size: 1.5em;
			}
			@media (min-width: 321px) and (min-height: 800px) {
				font-size: 1.6em;
			}
		}

	}
`
