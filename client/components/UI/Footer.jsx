import React, { Component } from 'react';
import styled from 'styled-components';
import { Hamburger, List } from './Icons';

class Footer extends Component {
  state = {
    isToday: true
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isToday !== this.props.isToday) {
      this.setState({ isToday: this.props.isToday });
    }
  }

  render() {
    return (
      <Container>
        {!this.state.isToday && (
          <button name="today" onClick={this.props.handleClick} className="button home">
            <span className="iconify" data-icon="bx:bxs-home-smile" data-inline="false" />
          </button>
        )}
        <button name="list" onClick={this.props.handleClick} className="button list">
          <List clicked={this.props.listClicked} />
        </button>
        <button name="hamburger" onClick={this.props.handleClick} className="button hamburger">
          <Hamburger clicked={this.props.clicked} />
        </button>
      </Container>
    );
  }
}

export default Footer;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 80px;
  background-color: var(--primary-2);
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    padding: 0;
    border-radius: 50%;
    background-color: var(--primary-1);
    outline: none;
    width: 50px;
    height: 50px;
  }
  .home,
  .list {
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
