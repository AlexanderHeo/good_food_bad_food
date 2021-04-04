import React, { Component } from 'react';
import styled from 'styled-components';
import About from './About';
import Change from './Change';
import FDA from './FDA';
import Main from './Main';
import Reset from './Reset';

class Setting extends Component {
  state = {
    settingDisplay: 'main'
  };

  handleClick = (e) => {
    e.preventDefault();
    const name = e.target.name;
    switch (name) {
      case 'main':
        this.setState({ settingDisplay: 'main' });
        break;
      case 'fda':
        this.setState({ settingDisplay: 'fda' });
        break;
      case 'setting':
        this.setState({ settingDisplay: 'setting' });
        break;
      case 'about':
        this.setState({ settingDisplay: 'about' });
        break;
      case 'reset':
        this.setState({ settingDisplay: 'reset' });
        break;
      case 'signout':
        this.setState({ settingDisplay: 'signout' });
        break;
      case 'confirm':
        this.props.logout();
        break;
      case 'return':
        this.props.handleClick();
        break;
      default:
        break;
    }
  };

  return = () => {
    this.setState({ settingDisplay: 'main' });
  };

  render() {
    let SettingDisplay;
    const display = this.state.settingDisplay;
    if (display === 'main') {
      SettingDisplay = <Main handleClick={this.handleClick} userData={this.props.userData} />;
    } else if (display === 'fda') {
      SettingDisplay = <FDA handleClick={this.handleClick} userData={this.props.userData} />;
    } else if (display === 'setting') {
      SettingDisplay = (
        <Change
          handleClick={this.handleClick}
          userData={this.props.userData}
          submitPatchData={this.props.updateUserData}
          return={this.return}
        />
      );
    } else if (display === 'about') {
      SettingDisplay = <About handleClick={this.handleClick} />;
    } else if (display === 'reset') {
      SettingDisplay = <Reset handleClick={this.handleClick} userData={this.props.userData} />;
    } else if (display === 'signout') {
      SettingDisplay = (
        <>
          <h1>CONFIRM YOU SIGNING OUT?</h1>
          <button className="button" name="confirm" onClick={this.handleClick}>
            Yes
          </button>
          <button className="button" name="return" onClick={this.handleClick}>
            No
          </button>
        </>
      );
    }

    return (
      <Container>
        <div className={this.props.clicked ? `${'setting'} ${'open'}` : `${'setting'} ${'closed'}`}>
          {SettingDisplay}
        </div>
      </Container>
    );
  }
}

export default Setting;

const Container = styled.div`
  width: 100vw;
  max-width: 500px;
  height: calc(100vh - 80px);
  background-color: var(--gray-9);
  .setting {
    width: 100%;
    height: 100%;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    background-color: var(--primary-1);
    transform: translateY(1000px);
    overflow-y: scroll;
  }
  .setting.open {
    animation: slideUp 0.3s forwards;
  }
  .setting.closed {
    animation: slideDown 0.3s forwards;
  }
  .section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    .titleSection {
      padding: 12px 0;
    }
    .searchSection {
      .input {
        padding: 12px;
        border: none;
        outline: none;
        border-radius: 12px;
      }
    }
    .searchSection {
      padding-bottom: 36px;
      width: 100%;
      .input {
        width: 80%;
      }
    }
    .mainSection {
      width: 80%;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding: 12px;
      border: 1px solid var(--primary-4);
      border-radius: 12px;
    }
    .buttonContainer {
      margin: 12px 0;
    }
    .paragraph {
    }
    .userData {
      font-size: 1.2rem;
    }
  }
  .buttonContainer {
    width: 100vw;
  }
  .mainButtonContainer {
    width: 100vw;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button {
    width: 80%;
    padding: 12px 24px;
    margin: 12px 0;
  }
  .disclaimer {
    color: var(--warning-4);
    font-weight: 500;
    background-color: var(--gray-0);
    border-radius: 2px;
    padding: 26px;
  }
`;
