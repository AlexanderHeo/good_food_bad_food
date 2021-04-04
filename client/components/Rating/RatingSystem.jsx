import React, { Component } from 'react';
import styled from 'styled-components';

class RatingSystem extends Component {
  state = {
    highlight: ''
  };

  componentDidMount() {
    if (this.props.rating) {
      this.setState({ highlight: this.props.rating.toString() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rating !== this.props.rating && this.props.rating) {
      this.setState({ highlight: this.props.rating.toString() });
    }
  }

  handleClick = (e) => {
    this.props.handleClick(e);
    this.setState({ highlight: e.target.name });
  };

  render() {
    let one = 'selection';
    let two = 'selection';
    let three = 'selection';
    let four = 'selection';
    let five = 'selection';
    switch (this.state.highlight) {
      case '1':
        one = 'chosen selection';
        break;
      case '2':
        two = 'chosen selection';
        break;
      case '3':
        three = 'chosen selection';
        break;
      case '4':
        four = 'chosen selection';
        break;
      case '5':
        five = 'chosen selection';
        break;
      default:
        break;
    }

    return (
      <Container>
        <div className="arrow">
          <div className="end leftEnd">Bad</div>
          <button name="1" className={one} onClick={this.handleClick}>
            1
          </button>
          <button name="2" className={two} onClick={this.handleClick}>
            2
          </button>
          <button name="3" className={three} onClick={this.handleClick}>
            3
          </button>
          <button name="4" className={four} onClick={this.handleClick}>
            4
          </button>
          <button name="5" className={five} onClick={this.handleClick}>
            5
          </button>
          <div className="end rightend">Good</div>
        </div>
      </Container>
    );
  }
}

export default RatingSystem;

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  border: 2px solid var(--primary-4);
  border-radius: 12px;
  .arrow {
    width: 100%;
    height: 50px;
    display: flex;
    .end,
    .selection {
      width: calc(100% / 7);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--primary-0);
      border: none;
      outline: none;
    }
    .end:first-of-type {
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
    .end:last-of-type {
      border-left: 1px solid var(--primary-4);
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }
    .selection {
      border-left: 1px solid var(--primary-4);
    }
    .chosen {
      background-color: var(--primary-4);
      color: var(--primary-0);
    }
  }
`;
