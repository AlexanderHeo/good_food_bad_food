import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container d-flex flex-column">
      <h2>Welcome to Good Food Bad Food!</h2>
      <h5>Thank you for downloading this app! This app
        is for people who need to track their diet due
        to a disease.
      </h5>
      <h5>There are many diseases that affect what you are
        able to eat. Eating something that does not
        agree with you can result in anything from
        minor discomfort to a hopsital trip.
      </h5>
      <h5>
        You can use GFBF to track what you eat,
        then come back and enter how it made you feel.
        This way you can keep a log of foods you can eat
        and foods that make you feel bad.
      </h5>
      <h5>
        By logging everything you ate and it&apos;s affect,
        you will be able to avoid foods that don&apos;t sit well with
        you in the future.
      </h5>
      <div>Developed By: Alex Heo, Andrew Zhou, and Evan Montgomery</div>
      <div className="row listMealsButtons justify-content-around mt-3">
        <Link className="halfButton text-center" to="/home">Home</Link>
      </div>
    </div>
  );
}

export default About;
