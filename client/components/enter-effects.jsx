import React from 'react';
import DailyList from './daily-list';

function EnterEffects() {
  return (
    <div className="container">
      <div className="row">
        <h1 className="header mt-3 mx-auto">
          <span>Enter Effect</span>
        </h1>
      </div>
      <p className="effectLabel mt-3 mx-auto" type="text">
        Choose the food you want to enter effect for:
      </p>
      <div className="effectBox ml-2 d-flex flex-column">
        <DailyList />
      </div>
      <div className="row listMealsButtons justify-content-around mt-3">
        <button className="halfButton">Home</button>
      </div>
    </div>
  );
}

export default EnterEffects;
