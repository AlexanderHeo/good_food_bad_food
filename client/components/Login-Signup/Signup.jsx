import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import State from '../Functions/StateChooser';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    city: '',
    state: '',
    message: '',
    success: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.createAccount();
  }

  createAccount = () => {
    const goodStuff = {
      username: this.state.username,
      password: this.state.password,
      city: this.state.city,
      state: this.state.state
    };
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goodStuff)
    };

    fetch('/api/sign-up', init)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          this.setState({ success: true })
          this.props.history.push('/home');
        } else {
          this.setState({ message: result.error });
        }
      })
      .catch(err => console.error(err));
  }

  handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }

	handleOnFocus = e => {
	  const focused = `${e.target.name}Focused`
	  this.setState({ [focused]: true })
	}

	render() {
	  return (
	    <Container>
	      <h1 className='title'>Sign Up</h1>
	      <form className='form' onSubmit={ this.handleSubmit }>
	        <fieldset className='fieldset'>
	          <label className='label'>
							Email:
	          </label>
	          <input
	            className='input'
	            type='email'
	            required={ this.state.emailFocused }
	            name='email'
	            value={ this.state.email }
	            onChange={ this.handleChange }
	            onFocus={ this.handleOnFocus } />
	        </fieldset>
	        <fieldset className='fieldset'>
	          <label className='label'>
							Username:
	          </label>
	          <input
	            className='input'
	            type='text'
	            required={ this.state.usernameFocused }
	            name='username'
	            value={ this.state.username }
	            onChange={ this.handleChange }
	            onFocus={ this.handleOnFocus } />
	        </fieldset>
	        <fieldset className='fieldset'>
	          <label className='label'>
							Password:
	          </label>
	          <input
	            className='input'
	            type='password'
	            required={ this.state.passwordFocused }
	            name='password'
	            value={ this.state.password }
	            onChange={ this.handleChange }
	            onFocus={ this.handleOnFocus } />
	        </fieldset>
	        <fieldset className='fieldset'>
	          <label className='label'>
							City:
	          </label>
	          <input
	            className='input'
	            type='text'
	            required={ this.state.cityFocused }
	            name='city'
	            value={ this.state.city }
	            onChange={ this.handleChange }
	            onFocus={ this.handleOnFocus } />
	        </fieldset>
	        <fieldset className='fieldset'>
	          <label className='label'>
							State:
	          </label>
	          <State
	            className='select'
	            required={ this.state.stateFocused }
	            onChange={ this.handleChange }
	            onFocus={ this.handleOnFocus }
	          />
	        </fieldset>
	        <div className='buttonContainer'>
	          <button className='button'>Sign Up</button>
	        </div>
	      </form>
	      <div className='linkContainer'>
	      	<Link to='/login' className='link'>login</Link>
	      </div>
	      {
	        this.state.success &&
					<Redirect
					  from='/signup'
					  to={{
					    pathname: 'home',
					    state: { username: this.state.username }
					  }}
					/>
	      }
	    </Container>
	  );
	}
}

export default Signup;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--primary-0);

	.returnButton {
		width: 50px;
		height: 50px;
		border: 4px solid var(--primary-6);
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		margin: 12px;
		padding-left: 6px;
	}

	.title {
		width: 100%;
		text-align: center;
		margin-top: 20%;
	}

	.form {
		width: 87%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.fieldset {
		padding: 12px 0;
		width: 100%;
	}
	.label {
		text-align: right;
		width: 30%;
		font-size: 1.2rem;
	}
	.input, .select {
		width: 60%;
		outline: none;
		border-radius: 10px;
		padding: 6px 12px;
		margin: 0 12px;
		box-shadow: 0 0 0 transparent;
	}
	.input:invalid, .select:invalid {
		box-shadow: 0 0 3px 3px var(--warning-4);

	}
	.select {
		border-width: 2px;
		border-style: inset;
		border-color: -internal-light-dark(rgb(118,118,118),rgb(133,133,133));
	}
	.buttonContainer {
		margin-top: 36px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.button {
			width: 90%;
			margin: 10px 0;
		}
	}
	.linkContainer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		margin-bottom: 24px;
		.link {
			font-size: 0.8rem;
			text-decoration: underline;
		}
	}
`
