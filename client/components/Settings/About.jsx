import React from 'react';

const About = (props) => (
  <section className="section">
    <div className="titleSection">
      <h1 className="title">Good Food</h1>
      <h1 className="title">Bad Food</h1>
    </div>
    <div className="mainSection">
      <p className="paragraph">
        After an amazing career behind the bar as a mixologist, I decided to change careers and went
        into tech. I loved the internet, already knew a little HTML and CSS, so decided to apply to
        a web dev boot camp. And I got accepted! Yay!
      </p>
      <p className="paragraph">
        Halfway through the program, I got really ill and ended up in the E.R. for a few days. After
        dozens of pokes, prods, and CT scans, the diagnosis was stress induced gastrointestinal
        motility issues. Basically, the food was not moving properly through my body, and I would
        have to watch my diet.
      </p>
      <p className="paragraph">
        So I decided to create this app, to track all the food I eat, and report whether it was good
        to eat, or if it caused a flair up of my illness. With this app, I am now able avoid Bad
        Foods, unless I&apos;m really craving a pepperoni pizza 😜
      </p>
      <p className="paragraph">
        I&apos;m adding more features and CSS animation all the time, so please come back often to
        see my progress. Or if you need, feel free to create an account and use this app! Drop me a
        line if you find a bug, or have an idea for a feature.
      </p>
      <p>
        <a href="https://alexheo.com" target="_blank" rel="noopener noreferrer">
          My Portfolio Site
        </a>
      </p>
    </div>
    <div className="buttonContainer">
      <button className="button" name="main" onClick={props.handleClick}>
        return
      </button>
    </div>
  </section>
);

export default About;
