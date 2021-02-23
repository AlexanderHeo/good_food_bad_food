import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReturnChevron } from './Icons';
import State from './StateChooser';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    city: '',
    state: '',
    message: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.createAccount();
  }

  createAccount = () => {
    const goodStuff = {
      username: this.state.username,
      password: this.state.password
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
	      <Link
	        to='/ls'
	        className='returnButton'
	      >
	        <ReturnChevron />
	      </Link>
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
	    </Container>
	  // <div className="container">
	  //   <h1 className="header mt-3 mx-auto">Sign Up</h1>
	  //   <div className="row ls-icons d-flex justify-content-around my-3 text-center">
	  //     <img src="images/angel.png" alt="" />
	  //     <img src="images/devil.png" alt="" />
	  //   </div>
	  //   <form className="ls" onSubmit={this.handleSubmit}>
	  //     <div className="row d-flex justify-content-center">
	  //       <div className="form-group d-flex flex-column text-center">
	  //         <label>Create A Username</label>
	  //         <input type="text" id="signupUsername" name="username" onChange={this.handleChange} />
	  //       </div>
	  //     </div>
	  //     <div className="row d-flex justify-content-center">
	  //       <div className="form-group d-flex flex-column text-center">
	  //         <label>Enter Your Password</label>
	  //         <input type="password" id="signupPassword" name="password" onChange={this.handleChange} />
	  //       </div>
	  //     </div>
	  //     <div className="row d-flex justify-content-center mt-5">
	  //       <button type="submit" className="halfButton">Create the Account!</button>
	  //     </div>
	  //     <div>{this.state.message}</div>
	  //   </form>
	  //   <div className="row listMealsButtons justify-content-around mt-3">
	  //     <Link className="halfButton text-center" to="/home">Home</Link>
	  //   </div>
	  // </div>
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
		margin: 36px 0;
	}

	.form {
		width: 87%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.fieldset {
		padding: 18px 0;
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
`
