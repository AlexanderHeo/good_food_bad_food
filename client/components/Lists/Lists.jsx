import React, { Component } from 'react'
import styled from 'styled-components'
import Level1 from './Level1'
import Level2 from './Level2'
import Level3Day from './Level3Day'
import Level3Meal from './Level3Meal'

class Lists extends Component {
	state = {
	  level1: '',
	  level2: '',
	  level3: '',
	  dayOrRating: ''
	}

	handleClick = e => {
	  e.preventDefault()
	  const name = e.target.getAttribute('name')
	  const value = e.target.value
	  if (name === 'average') {
	    this.setState({
	      level1: 'average',
	      level2: '',
	      level3: '',
	      dayOrRating: 'day'
	    })
	  } else if (name === 'most') {
	    this.setState({
	      level1: 'most',
	      level2: '',
	      level3: '',
	      dayOrRating: 'rating'
	    })
	  } else if (name === 'least') {
	    this.setState({
	      level1: 'least',
	      level2: '',
	      level3: '',
	      dayOrRating: 'rating'
	    })
	  } else if (name === 'level21') {
	    if (this.state.level1 === 'average') {
	      this.setState({
	        level2: 'avgMeal',
	        level3: ''
	      })
	    } else if (this.state.level1 === 'most') {
	      this.setState({
	        level2: 'mostMeal',
	        level3: ''
	      })
	    } else if (this.state.level1 === 'least') {
	      this.setState({
	        level2: 'leastMeal',
	        level3: ''
	      })
	    }
	  } else if (name === 'byDay') {
	    this.setState({ level2: 'avgDay' })
	  } else if (name === 'overall') {
	    if (this.state.level1 === 'most') {
	      this.setState({
	        level2: 'mostOverall',
	        level3: 'overall'
	      })
	    } else if (this.state.level1 === 'least') {
	      this.setState({
	        level2: 'leastOverall',
	        level3: 'overall'
	      })
	    }
	  } else if (value) {
	    this.setState({ level3: value })
	  }
	}

	render() {
	  let Level3 = null
	  const level2 = this.state.level2
	  if (level2 === 'avgMeal') {
	    Level3 = <Level3Meal handleClick={ this.handleClick }/>
	  } else if (level2 === 'avgDay') {
	    Level3 = <Level3Day handleClick={ this.handleClick }/>
	  } else if (level2 === 'mostMeal' || level2 === 'leastMeal') {
	    Level3 = <Level3Meal handleClick={ this.handleClick }/>
	  }

	  return (
	    <Container>
	      <section className='listChooserContainer'>
					List Chooser
	      </section>
	      <section className='listContainer'>
					list
	      </section>
	      <section className='buttonContainer'>
	        <Level1 handleClick={ this.handleClick } />
	      	{
	          this.state.level1 &&
						<Level2
						  handleClick={ this.handleClick }
						  dayOrRating={ this.state.dayOrRating }
						/>
	        }
	        { Level3 }
	      </section>
	    </Container>
	  )
	}
}

export default Lists

const Container = styled.div`
	width: 100vw;
	height: calc(100vh - 80px);
	background-color: var(--primary-0);
	position: absolute;
	top: 0;
	left: 0;

	.buttonContainer {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: var(--primary-2);
		padding: 16px 0 0;
		text-align: center;
	}
	.button {
		font-size: 1rem;
		margin: 0 6px;
		width: 30%;
		outline: none;
		display: inline-flex;
		justify-content: center;
		margin: 2px;
	}
	.level2, .level3 {
		position: initial;
	}
	.highlight {
		background-color: var(--primary-6);
		color: var(--primary-0);
	}
`
