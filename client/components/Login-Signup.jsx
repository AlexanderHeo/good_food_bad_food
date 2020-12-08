import React from 'react';
import { Link } from 'react-router-dom';

const LoginSignup = props => {
  return (
    <div className="container">
      <div className="col">
        <div className="d-flex justify-content-center align-items-center ls-icons">
          <div className="text-success">Good Food</div>
          <img className="" src="/images/angel.png" alt="" />
        </div>
      </div>
      <div className="col">
        <div className="d-flex justify-content-center align-items-center ls-icons">
          <div className="text-danger">Bad Food</div>
          <img className="" src="/images/devil.png" alt="" />
        </div>
      </div>
      <div className="col d-flex justify-content-around mt-5">
        <Link className="halfButton text-center" to="/login">Log In</Link>
        <Link className="halfButton text-center" to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginSignup;
