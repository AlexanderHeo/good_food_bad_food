import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container d-flex flex-column">
      <h1>Welcome to Good Food Bad Food!</h1>
      <h5>Thank you for downloading this app! This app
        is for people who need to track their diet due
        to a disease.
      </h5>
      <h5>There are many diseases that is affected by
        what you eat. Eating something that does not
        agree with you can result in anything from
        minor discomfort, to something more serious.
      </h5>
      <h5>
        You can use GFBF to track what you ate today,
        then come back and enter how it effected you,
        whether good or bad. This way you can keep a
        log of your favorite foods and how it makes you feel.
      </h5>
      <h5>
        By logging everything you ate and it&apos;s affect,
        you will be able to avoid bad affecting foods
        in the future!
      </h5>
      <div className="row listMealsButtons justify-content-around mt-3">
        <Link className="halfButton text-center" to="/home">Home</Link>
      </div>
    </div>
  );
}

export default About;
