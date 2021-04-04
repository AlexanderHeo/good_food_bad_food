import React from 'react';
import styled from 'styled-components';

const Backdrop = (props) => <Container onClick={props.handleClick} />;

export default Backdrop;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: hsla(0, 0%, 40%, 0.7);
  z-index: 50;
`;
