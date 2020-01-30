import React from 'react';
import { Link } from 'react-router-dom';

const LoginSignup = props => {
  return (
    <div className="container">
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up!</Link>
    </div>
  );
};

export default LoginSignup;
