import React, { Component } from 'react'
import styled from 'styled-components'
import Level1 from './Level1'
import Level2 from './Level2'

class Lists extends Component {
	state = {
	  level1: '',
	  level2: '',
	  dayOrRating: '',
	  displayList: []
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevState.level2 !== this.state.level2) {
	    this.doTheThing()
	  }
	}

	doTheThing = () => {
	  const { level1, level2 } = this.state
	  if (!level2) {
	    this.setState({ displayList: [] })
	  } else if (level1 === 'average') {
	    this.getAverage(level2)
	  } else if (level1 === 'most') {
	    this.getMost(level2, 'most')
	  } else if (level1 === 'least') {
	    this.getMost(level2, 'least')
	  }
	}

	getAverage = filter => {
	  const { list } = this.props
	  if (filter === 'meal') {
	    let breakfast = 0
	    let lunch = 0
	    let dinner = 0
	    let snacks = 0
	    list.forEach(x => {
	      const mealtime = x.mealtime
	      if (mealtime === 'breakfast') breakfast += x.report
	      if (mealtime === 'lunch') lunch += x.report
	      if (mealtime === 'dinner') dinner += x.report
	      if (mealtime === 'snacks') snacks += x.report
	    })
	    this.setState({
	      displayList: [
	        { breakfast }, { lunch }, { dinner }, { snacks }
	      ]
	    })
	  } else if (filter === 'day') {
	    let sun = 0
	    let mon = 0
	    let tue = 0
	    let wed = 0
	    let thu = 0
	    let fri = 0
	    let sat = 0
	    list.forEach(x => {
	      const day = new Date(x.eatenAt).getDay()
	      switch (day) {
	        case 0:
	          sun += x.report
	          break
	        case 1:
	          mon += x.report
	          break
	        case 2:
	          tue += x.report
	          break
	        case 3:
	          wed += x.report
	          break
	        case 4:
	          thu += x.report
	          break
	        case 5:
	          fri += x.report
	          break
	        case 6:
	          sat += x.report
	          break
	        default:
	          break
	      }
	    })
	    this.setState({
	      displayList: [
	      	{ sun }, { mon }, { tue }, { wed }, { thu }, { fri }, { sat }
	    	]
	    })
	  }
	}

	getMost = (filter, rating) => {
	  const { list } = this.props
	  if (filter === 'meal') {
	    const breakfast = []
	    const lunch = []
	    const dinner = []
	    const snacks = []
	    list.forEach(x => {
	      const mealtime = x.mealtime
	      switch (mealtime) {
	        case 'breakfast':
	          breakfast.push(x)
	          break
	        case 'lunch':
	          lunch.push(x)
	          break
	        case 'dinner':
	          dinner.push(x)
	          break
	        case 'snacks':
	          snacks.push(x)
	          break
	        default:
	          break
	      }
	    })
	    breakfast.sort((a, b) => a.report - b.report)
	    lunch.sort((a, b) => a.report - b.report)
	    dinner.sort((a, b) => a.report - b.report)
	    snacks.sort((a, b) => a.report - b.report)
	    if (rating === 'most') {
	      breakfast.reverse()
	      lunch.reverse()
	      dinner.reverse()
	      snacks.reverse()
	    }

	    this.setState({
	      displayList: [
	        { breakfast }, { lunch }, { dinner }, { snacks }
	      ]
	    })
	  }
	}

	handleClick = e => {
	  e.preventDefault()
	  const name = e.target.getAttribute('name')
	  if (name === 'average') {
	    this.setState({
	      displayList: [],
	      level1: 'average',
	      level2: '',
	      dayOrRating: 'day'
	    })
	  } else if (name === 'most') {
	    this.setState({
	      displayList: [],
	      level1: 'most',
	      level2: '',
	      dayOrRating: 'rating'
	    })
	  } else if (name === 'least') {
	    this.setState({
	      displayList: [],
	      level1: 'least',
	      level2: '',
	      dayOrRating: 'rating'
	    })
	  } else {
	    this.setState({ level2: name })
	  }
	}

	render() {
	  return (
	    <Container>
	      <section className='listHeader'>
	        <div className='title'>Your avg/most/leasts</div>
	      </section>
	      <section className='listContainer'>
					list
	      </section>
	      <section className='buttonContainer'>
	        <Level1
	          handleClick={ this.handleClick }
	          level1={ this.state.level1 }
	        />
	      	{
	          this.state.level1 &&
						<Level2
						  handleClick={ this.handleClick }
						  dayOrRating={ this.state.dayOrRating }
						  level2={ this.state.level2 }
						/>
	        }
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

	.listHeader {
		text-align: center;
		padding: 24px 0;
		.title {
			font-size: 1.4rem;
			font-weight: 700;
		}
	}

	.listContainer {
		border: 10px solid hotpink;
	}

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
