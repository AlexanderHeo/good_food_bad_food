import React from 'react';

const Main = (props) => (
  <section className="section">
    <div className="titleSection">
      <h1 className="title">Settings</h1>
    </div>
    <div className="mainButtonContainer">
      <button name="fda" className="button" onClick={props.handleClick}>
        FDA Warnings
      </button>
      <button name="setting" className="button" onClick={props.handleClick}>
        Change Settings
      </button>
      <button name="about" className="button" onClick={props.handleClick}>
        About
      </button>
      <button name="reset" className="button" onClick={props.handleClick}>
        Reset Password
      </button>
      <button name="signout" className="button" onClick={props.handleClick}>
        Sign Out
      </button>
    </div>
  </section>
);

export default Main;
