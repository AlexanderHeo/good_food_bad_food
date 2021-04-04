import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import MobileFrame from './Mobile-Frame';

class Logo extends Component {
  state = {
    goodfood: false,
    badfood: false,
    blackout: false,
    login: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ goodfood: true }), 800);
    setTimeout(() => this.setState({ badfood: true }), 1600);
    setTimeout(() => this.setState({ blackout: true }), 2400);
    setTimeout(() => this.setState({ login: true }), 4400);
  }

  render() {
    return (
      <MobileFrame>
        <Blackout>
          <div className={this.state.blackout ? `${'blackout'} ${'start'}` : 'blackout'} />
        </Blackout>
        <Container>
          <div className="main">
            <div className="app-logo">
              <h1 className={this.state.goodfood ? `${'title'} ${'goodfood'}` : 'title'}>
                Good Food
              </h1>
            </div>
            <div className="app-logo">
              <h1 className={this.state.badfood ? `${'title'} ${'badfood'}` : 'title'}>Bad Food</h1>
            </div>
          </div>
          {this.state.login ? <Redirect to={{ pathname: '/login' }} /> : null}
        </Container>
      </MobileFrame>
    );
  }
}

export default Logo;

const Blackout = styled.div`
  .blackout {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary-6);
    opacity: 0;
  }
  .start {
    animation: startBlackout 1.8s forwards;
  }
  @keyframes startBlackout {
    to {
      opacity: 1;
    }
  }
`;

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
  }

  .app-logo {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

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

  .goodfood {
    animation: goodfood 1.4s forwards;
  }
  .badfood {
    animation: badfood 1.4s forwards;
  }

  @keyframes goodfood {
    to {
      transform: scale(35) translateY(20px);
    }
  }
  @keyframes badfood {
    to {
      transform: scale(35) translateY(-40px);
    }
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .button {
      @media (min-width: 321px) {
        font-size: 1.5em;
      }
      @media (min-width: 321px) and (min-height: 800px) {
        font-size: 1.6em;
      }
    }
  }
`;
