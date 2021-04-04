import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

class ResetPassword extends Component {
  state = {
    password: '',
    reenter: '',
    newPassword: '',
    p1Displayed: false,
    p2Displayed: false,
    pnDisplayed: false,
    errorMessage: '',
    newPasswordModalDisplay: false,
    success: false,
    p1Clicked: false,
    p2Clicked: false,
    pnClicked: false
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleOnFocus = () => this.setState({ errorMessage: '' });

  handleClick = (e) => {
    e.preventDefault();
    const { password, reenter, newPassword, p1Displayed, p2Displayed, pnDisplayed } = this.state;

    if (e.target.name === 'password') {
      this.setState({ p1Displayed: !p1Displayed });
    } else if (e.target.name === 'reenter') {
      this.setState({ p2Displayed: !p2Displayed });
    } else if (e.target.name === 'newPassword') {
      this.setState({ pnDisplayed: !pnDisplayed });
    } else if (e.target.name === 'submit') {
      if (!password || !reenter) {
        this.setState({ errorMessage: 'Enter your password' });
      } else if (password && reenter && password !== reenter) {
        this.setState({ errorMessage: 'Passwords do not match.' });
      } else if (password && reenter && password === reenter) {
        this.checkOldPassword();
      }
    } else if (e.target.name === 'finalSubmit') {
      if (!newPassword) this.setState({ errorMessage: 'Enter a new password.' });
      if (newPassword === password) { this.setState({ errorMessage: 'New password must be different.' }); }
      if (newPassword && newPassword !== password) this.setNewPassword();
    }
  };

  setEye = (selection) => {
    const { p1Displayed, p2Displayed, pnDisplayed } = this.state;
    if (selection === 'first') {
      this.setState({
        p1Displayed: !p1Displayed,
        p1Clicked: true
      });
    }
    if (selection === 'second') {
      this.setState({
        p2Displayed: !p2Displayed,
        p2Clicked: true
      });
    }
    if (selection === 'new') {
      this.setState({
        pnDisplayed: !pnDisplayed,
        pnClicked: true
      });
    }
  };

  checkOldPassword = async () => {
    const { password } = this.state;
    const { userId } = this.props.userData;
    const userData = { userId, password };
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    };
    const checkRes = await fetch('/api/check', init);
    const checkJSON = await checkRes.json();
    if (checkJSON.success) {
      this.setState({ newPasswordModalDisplay: true });
    } else if (checkJSON.error) {
      this.setState({ error: checkJSON.error });
    }
  };

  setNewPassword = () => {
    const { newPassword } = this.state;
    const { userId } = this.props.userData;
    const patchData = { userId, newPassword };
    const init = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchData)
    };
    fetch(`/api/reset/${userId}`, init)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) this.setState({ success: true });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <Container>
        {this.state.newPasswordModalDisplay ? (
          <div className="newPasswordContainer">
            <h2>Enter yo new password here!</h2>
            <form className="form">
              <div className="formSection">
                <label className="label" htmlFor="newPassword">
                  New Password:
                </label>
                <input
                  className="input"
                  name="newPassword"
                  onFocus={this.handleOnFocus}
                  onChange={this.handleChange}
                  value={this.state.newPassword}
                  type={this.state.pnDisplayed ? 'text' : 'password'}
                />
                <div
                  className={
                    !this.state.pnDisplayed
                      ? this.state.pnClicked
                        ? 'passwordEye closed'
                        : 'passwordEye'
                      : this.state.pnClicked
                        ? 'passwordEye open'
                        : 'passwordEye'
                  }
                  onClick={() => this.setEye('new')}
                >
                  <div className="openEye">
                    <span className="iconify" data-icon="fe:eye" data-inline="false" />
                  </div>
                  <div className="closedEye">
                    <span className="iconify" data-icon="eva:eye-off-2-fill" data-inline="false" />
                  </div>
                </div>
              </div>
              {this.state.errorMessage ? (
                <h2>{this.state.errorMessage}</h2>
              ) : (
                <div className="buttonContainer">
                  <button className="button" name="finalSubmit" onClick={this.handleClick}>
                    Submit
                  </button>
                  <button className="button" name="return" onClick={this.handleClick}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="newPasswordContainer">
            <h2>Enter yo old password here!</h2>
            <form className="form">
              <div className="formSection">
                <label className="label" htmlFor="password">
                  Old Password:
                </label>
                <input
                  className="input"
                  name="password"
                  onFocus={this.handleOnFocus}
                  onChange={this.handleChange}
                  value={this.state.password}
                  type={this.state.p1Displayed ? 'text' : 'password'}
                />
                <div
                  className={
                    !this.state.p1Displayed
                      ? this.state.p1Clicked
                        ? 'passwordEye closed'
                        : 'passwordEye'
                      : this.state.p1Clicked
                        ? 'passwordEye open'
                        : 'passwordEye'
                  }
                  onClick={() => this.setEye('first')}
                >
                  <div className="openEye">
                    <span className="iconify" data-icon="fe:eye" data-inline="false" />
                  </div>
                  <div className="closedEye">
                    <span className="iconify" data-icon="eva:eye-off-2-fill" data-inline="false" />
                  </div>
                </div>
              </div>
              <div className="formSection">
                <label className="label" htmlFor="reenter">
                  Old Password:{' '}
                </label>
                <input
                  className="input"
                  onChange={this.handleChange}
                  onFocus={this.handleOnFocus}
                  name="reenter"
                  value={this.state.reenter}
                  type={this.state.p2Displayed ? 'text' : 'password'}
                />
                <div
                  className={
                    !this.state.p2Displayed
                      ? this.state.p2Clicked
                        ? 'passwordEye closed'
                        : 'passwordEye'
                      : this.state.p2Clicked
                        ? 'passwordEye open'
                        : 'passwordEye'
                  }
                  onClick={() => this.setEye('second')}
                >
                  <div className="openEye">
                    <span className="iconify" data-icon="fe:eye" data-inline="false" />
                  </div>
                  <div className="closedEye">
                    <span className="iconify" data-icon="eva:eye-off-2-fill" data-inline="false" />
                  </div>
                </div>
              </div>
              {this.state.errorMessage ? (
                <div>{this.state.errorMessage}</div>
              ) : (
                <div className="buttonContainer">
                  <button className="button" name="submit" onClick={this.handleClick}>
                    Submit
                  </button>
                  <button className="button" name="return" onClick={this.handleClick}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
        {this.state.success && <Redirect to="/login" />}
      </Container>
    );
  }
}

export default ResetPassword;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: hotpink;
  border: 5px solid rebeccapurple;
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
  .newPasswordContainer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: var(--primary-0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h2 {
    text-align: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .formSection {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px 0;
    position: relative;
  }
  .label {
    font-size: 0.9rem;
    font-weight: 700;
    width: 30%;
    text-align: right;
    margin-right: 6px;
    height: min-content;
  }
  .input {
    width: 60%;
    outline: none;
    border-radius: 16px;
    padding: 6px;
    margin: 0 12px;
    font-size: 1.3rem;
    font-weight: 700;
    text-align: left;
    background-color: var(--primary-2);
    box-shadow: 0 0 0 transparent;
  }
  .input:invalid {
    box-shadow: 0 0 3px 3px var(--warning-4);
  }
  .buttonContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button {
    border: 1px solid var(--primary-6);
    text-align: center;
    width: 80%;
    padding: 12px 24px;
    margin: 12px 0;
  }
  .passwordEye {
    width: 35px;
    height: 35px;
    position: absolute;
    right: 0;
    top: -2px;
    transform: translate(-23px, 8px);
    background-color: var(--primary-0);
    line-height: 0;
    font-size: 2.2rem;
    border-radius: 50%;
    padding: 2px;
  }
  .openEye,
  .closedEye {
    position: absolute;
    top: 0;
    right: 0;
  }
  .closedEye {
    transform: rotateX(90deg);
  }
  .openEye {
    transform: rotateX(0deg);
  }
  .passwordEye.open .closedEye {
    animation: closedEyeOpen 0.5s forwards;
  }
  .passwordEye.closed .closedEye {
    animation: closedEyeClose 0.5s forwards;
  }
  .passwordEye.open .openEye {
    animation: openEyeOpen 0.5s forwards;
  }
  .passwordEye.closed .openEye {
    animation: openEyeClose 0.5s forwards;
  }
  @keyframes closedEyeOpen {
    from {
      transform: rotateX(90deg);
    }
    to {
      transform: rotateX(0);
    }
  }
  @keyframes closedEyeClose {
    from {
      transform: rotateX(0);
    }
    to {
      transform: rotateX(90deg);
    }
  }
  @keyframes openEyeOpen {
    from {
      transform: rotateX(0);
    }
    to {
      transform: rotateX(-90deg);
    }
  }
  @keyframes openEyeClose {
    from {
      transform: rotateX(-90deg);
    }
    to {
      transform: rotateX(0);
    }
  }
`;
