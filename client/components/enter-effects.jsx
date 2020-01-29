import React from 'react';
import DailyList from './daily-list';

function EnterEffects() {
  return (
    <div className="container d-flex">
      <div className="row">
        <h1 className="header mt-4 mx-auto">
          <span>Enter Effect</span>
        </h1>
      </div>
      <p className="effectLabel mt-4 mx-auto" type="text">
        Choose the food you want to enter effect for:
      </p>
      <div className="effectBox">
        <DailyList />
      </div>
    </div>
  );
}

export default EnterEffects;
