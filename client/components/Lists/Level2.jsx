import React, { Component } from 'react'

class Level2 extends Component {

  render() {
    let meal, day, overall
    const level2 = this.props.level2
    if (level2 === 'avgMeal') {
		 meal = 'highlight'
    } else if (level2 === 'avgDay') {
		 day = 'highlight'
    } else if (level2 === 'mostMeal') {
		 meal = 'highlight'
    } else if (level2 === 'leastMeal') {
		 meal = 'highlight'
    } else if (level2 === 'mostOverall') {
		 overall = 'highlight'
    } else if (level2 === 'leastOverall') {
		 overall = 'highlight'
    }

    let button = null
    if (this.props.dayOrRating === 'day') {
      button = <button
        name='byDay'
        onClick={ this.props.handleClick }
        className={`button ${day}`}
      >by Day</button>
    } else if (this.props.dayOrRating === 'rating') {
      button = <button
        name='overall'
        onClick={ this.props.handleClick }
        className={`button ${overall}`}
      >Overall</button>
    }

    return (
      <section className='buttonContainer level2'>
        <button
          name='level21'
          onClick={ this.props.handleClick }
          className={`button ${meal}`}
        >by Meal</button>
        {button}
      </section>
    )
  }
}

export default Level2
