import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ResetPassword = props => (
  <Container>
    <div className='message'>
      <h1>Reset Password</h1>
      <p>Please email the webmaster and he will manually change your password for you, for now.</p>
      <p>Come back real soon for a real Reset Password feature</p>
    </div>
    <Link to='/login' className='link'>Return</Link>
  </Container>
)

export default ResetPassword

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: hotpink;
	border: 5px solid hotpink;
	.message {
		text-align: center;
	}
	.link {
		border: 3px solid rebeccapurple;
		border-radius: 36px;
		padding: 12px 24px;
		font-weight: 700;
		background-color: var(--primary-6);
		color: var(--primary-0);
	}
`
