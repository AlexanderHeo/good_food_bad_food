import React, { Component } from 'react';
import styled from 'styled-components';

class RatingDisplay extends Component {
  state = {
    rating: ''
  };

  componentDidMount() {
    this.setState({ rating: this.props.rating });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rating !== prevProps.rating) {
      this.setState({ rating: this.props.rating });
    }
  }

  render() {
    let rating = <div>loading...</div>;
    switch (this.state.rating) {
      case 1:
        rating = <div className="rating one">1</div>;
        break;
      case 2:
        rating = <div className="rating two">2</div>;
        break;
      case 3:
        rating = <div className="rating three">3</div>;
        break;
      case 4:
        rating = <div className="rating four">4</div>;
        break;
      case 5:
        rating = <div className="rating five">5</div>;
        break;
      default:
        rating = null;
    }
    return <Container>{rating}</Container>;
  }
}

export default RatingDisplay;

const Container = styled.div`
  width: 100%;
  .rating {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 700;
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
  }
  .one {
    color: var(--warning-2);
    background-color: var(--warning-7);
    border-color: var(--warning-2);
  }
  .two {
    color: var(--warning-7);
    background-color: var(--warning-3);
    border-color: var(--warning-7);
  }
  .three {
    color: var(--gray-6);
    background-color: var(--gray-0);
    border-color: var(--gray-6);
  }
  .four {
    color: var(--primary-6);
    background-color: var(--primary-2);
    border-color: var(--primary-6);
  }
  .five {
    color: var(--primary-2);
    background-color: var(--primary-6);
    border-color: var(--primary-2);
  }
`;
