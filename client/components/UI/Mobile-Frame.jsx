import React from 'react';
import styled from 'styled-components';

const mobileFrame = (props) => <Container>{props.children}</Container>;

export default mobileFrame;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
