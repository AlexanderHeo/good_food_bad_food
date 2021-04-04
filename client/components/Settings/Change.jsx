import React from 'react';
import styled from 'styled-components';

class Change extends React.Component {
  state = {
    city: '',
    state: '',
    errorMessage: ''
  };

  handleButtonClick = (e) => {
    e.preventDefault();
    const name = e.target.name;
    if (name === 'return') {
      this.props.return();
    } else if (name === 'submit') {
      if (!this.state.city) {
        this.setState({ errorMessage: 'Please enter city' });
      } else if (!this.state.state) {
        this.setState({ errorMessage: 'Please enter state' });
      } else if (
        this.state.city === this.props.userData.city &&
        this.state.state === this.props.userData.state
      ) {
        this.setState({ errorMessage: 'New city must be different from old city.' });
      } else {
        this.submitPatchData();
      }
    }
  };

  submitPatchData = () => {
    const { userId } = this.props.userData;
    const { city, state } = this.state;

    const patchData = { city, state, userId };
    const init = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchData)
    };
    fetch(`/api/location/${userId}`, init)
      .then((response) => response.json())
      .then((data) => {
        this.props.submitPatchData(data);
        this.props.return();
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleOnFocus = (e) => {
    const focused = `${e.target.name}Focused`;
    this.setState({
      errorMessage: '',
      [focused]: true
    });
  };

  render() {
    return (
      <ChangeContainer>
        <h1 className="title">Change Settings</h1>
        <form className="form">
          <fieldset className="fieldset">
            <label className="label">City:</label>
            <input
              className="input"
              type="text"
              name="city"
              required={this.state.cityFocused}
              value={this.state.city}
              placeholder=""
              onChange={this.handleChange}
              onFocus={this.handleOnFocus}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">State:</label>
            <input
              className="input"
              type="text"
              name="state"
              required={this.state.stateFocused}
              value={this.state.state}
              placeholder=""
              onChange={this.handleChange}
              onFocus={this.handleOnFocus}
            />
          </fieldset>
          {this.state.errorMessage ? (
            <div className="errorMessage">{this.state.errorMessage}</div>
          ) : (
            <div className="button-container">
              <button name="submit" className="button" onClick={this.handleButtonClick}>
                Submit
              </button>
              <button name="return" className="button" onClick={this.handleButtonClick}>
                Return
              </button>
            </div>
          )}
        </form>
      </ChangeContainer>
    );
  }
}

export default Change;

const ChangeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    margin-top: 55%;
  }
  .form {
    padding: 0 20px;
    text-align: center;
    .fieldset {
      padding: 10px 0;
      margin: 10px 0;
    }
    .fieldset:last-of-type {
      margin-bottom: 50px;
    }
    .label,
    .input {
      font-size: 1.3rem;
      font-weight: 700;
    }
    .label {
      width: 30%;
      text-align: right;
    }
    .input {
      width: 60%;
      outline: none;
      border-radius: 16px;
      padding: 6px 6px;
      margin: 0 12px;
      text-align: center;
      background-color: var(--primary-0);
      box-shadow: 0 0 0 transparent;
    }
    .input:invalid {
      box-shadow: 0 0 3px 3px var(--warning-4);
    }
    .button-container {
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
    .errorMessage {
      width: calc(100% - 40px);
      position: absolute;
      font-size: 1.5rem;
      color: var(--warning-4);
      font-weight: 700;
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
      margin: 0 36px;
    }
  }
`;
