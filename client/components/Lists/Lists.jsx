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
	  if (filter === 'meal') {
	    const displayList = this.getAvgMeal()
	    this.setState({ displayList: displayList })
	  } else if (filter === 'day') {
	    const displayList = this.getAvgDay()
	    this.setState({ displayList: displayList })
	  } else if (filter === 'food') {
	    const displayList = this.getAvgFood()
	    this.setState({ displayList: displayList })
	  }
	}

	getAvgMeal = () => {
	  const { list } = this.props
	  const br = []
	  const l = []
	  const d = []
	  const s = []
	  list.forEach(x => {
	    const mealtime = x.mealtime
	    if (mealtime === 'breakfast') br.push(x.report)
	    if (mealtime === 'lunch') l.push(x.report)
	    if (mealtime === 'dinner') d.push(x.report)
	    if (mealtime === 'snacks') s.push(x.report)
	  })
	  const breakfast = ((br.reduce((a, b) => a + b)) / br.length).toFixed(3)
	  const lunch = ((l.reduce((a, b) => a + b)) / l.length).toFixed(3)
	  const dinner = ((d.reduce((a, b) => a + b)) / d.length).toFixed(3)
	  const snacks = ((s.reduce((a, b) => a + b)) / s.length).toFixed(3)

	  return [{ breakfast }, { lunch }, { dinner }, { snacks }]
	}

	getAvgFood = () => {
	  const { list } = this.props
	  const filtered = []
	  const foodList = []
	  list.forEach(x => {
	    const food = x.name
	    if (!foodList.includes(food)) {
	      foodList.push(food)
	      filtered.push({ [food]: [x.report] })
	    } else {
	      const index = foodList.indexOf(food)
	      filtered[index][food].push(x.report)
	    }
	  })
	  foodList.sort()
	  const sorted = new Array(filtered.length)
	  filtered.forEach(x => {
	    const index = foodList.indexOf(Object.keys(x)[0])
	    sorted.splice(index, 1, x)
	  })
	  const displayList = sorted.map((x, index) => {
	    let avg = (x[foodList[index]].reduce((a, b) => a + b)) / x[foodList[index]].length
	    if (avg.toString().includes('.')) avg = avg.toFixed(3)
	    return { [foodList[index]]: avg }
	  })
	  return displayList
	}

	getAvgDay = () => {
	  const { list } = this.props
	  const su = []
	  const mo = []
	  const tu = []
	  const we = []
	  const th = []
	  const fr = []
	  const sa = []
	  list.forEach(x => {
	    const day = new Date(x.eatenAt).getDay()
	    switch (day) {
	      case 0:
	        su.push(x.report)
	        break
	      case 1:
	        mo.push(x.report)
	        break
	      case 2:
	        tu.push(x.report)
	        break
	      case 3:
	        we.push(x.report)
	        break
	      case 4:
	        th.push(x.report)
	        break
	      case 5:
	        fr.push(x.report)
	        break
	      case 6:
	        sa.push(x.report)
	        break
	      default:
	        break
	    }
	  })
	  let sun = su.reduce((a, b) => a + b) / su.length
	  let mon = mo.reduce((a, b) => a + b) / mo.length
	  let tue = tu.reduce((a, b) => a + b) / tu.length
	  let wed = we.reduce((a, b) => a + b) / we.length
	  let thu = th.reduce((a, b) => a + b) / th.length
	  let fri = fr.reduce((a, b) => a + b) / fr.length
	  let sat = sa.reduce((a, b) => a + b) / sa.length

	  if (sun.toString().includes('.')) sun = sun.toFixed(3)
	  if (mon.toString().includes('.')) mon = mon.toFixed(3)
	  if (tue.toString().includes('.')) tue = tue.toFixed(3)
	  if (wed.toString().includes('.')) wed = wed.toFixed(3)
	  if (thu.toString().includes('.')) thu = thu.toFixed(3)
	  if (fri.toString().includes('.')) fri = fri.toFixed(3)
	  if (sat.toString().includes('.')) sat = sat.toFixed(3)

	  return [{ sun }, { mon }, { tue }, { wed }, { thu }, { fri }, { sat }]
	}

	getMost = (filter, rating) => {
	  const { list } = this.props
	  if (filter === 'meal') {
	    const breakfastFiltered = []
	    const breakfastList = breakfastFiltered.map(x => x.name)
	    const lunchFiltered = []
	    const lunchList = lunchFiltered.map(x => x.name)
	    const dinnerFiltered = []
	    const dinnerList = dinnerFiltered.map(x => x.name)
	    const snacksFiltered = []
	    const snacksList = snacksFiltered.map(x => x.name)
	    list.forEach(x => {
	      const { name, mealtime } = x
	      if (mealtime === 'breakfast') {
	        if (!breakfastList.includes(name)) {
	          breakfastFiltered.push({ [name]: 1 })
	          breakfastList.push(name)
	        } else if (breakfastList.includes(name)) {
	          const index = breakfastList.indexOf(name)
	          breakfastFiltered[index][name] += 1
	        }
	      }
	      if (mealtime === 'lunch') {
	        if (!lunchList.includes(name)) {
	          lunchFiltered.push({ [name]: 1 })
	          lunchList.push(name)
	        } else if (lunchList.includes(name)) {
	          const index = lunchList.indexOf(name)
	          lunchFiltered[index][name] += 1
	        }
	      }
	      if (mealtime === 'dinner') {
	        if (!dinnerList.includes(name)) {
	          dinnerFiltered.push({ [name]: 1 })
	          dinnerList.push(name)
	        } else if (dinnerList.includes(name)) {
	          const index = dinnerList.indexOf(name)
	          dinnerFiltered[index][name] += 1
	        }
	      }
	      if (mealtime === 'snacks') {
	        if (!snacksList.includes(name)) {
	          snacksFiltered.push({ [name]: 1 })
	          snacksList.push(name)
	        } else if (snacksList.includes(name)) {
	          const index = snacksList.indexOf(name)
	          snacksFiltered[index][name] += 1
	        }
	      }
	    })

	    const breakfast = breakfastFiltered.sort((a, b) => {
	      return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
	    })
	    const lunch = lunchFiltered.sort((a, b) => {
	      return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
	    })
	    const dinner = dinnerFiltered.sort((a, b) => {
	      return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
	    })
	    const snacks = snacksFiltered.sort((a, b) => {
	      return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
	    })

	    if (rating === 'most') {
	      breakfast.reverse()
	      lunch.reverse()
	      dinner.reverse()
	      snacks.reverse()
	    }

	    const displayList = { breakfast, lunch, dinner, snacks }
	    this.setState({ displayList: displayList })

	  } else if (filter === 'food') {
	  	const filtered = []
	    const foodList = []
	    list.forEach(x => {
	      const name = x.name
	      if (!foodList.includes(name)) {
	        filtered.push({ [name]: [name] })
	        foodList.push(name)
	      } else {
	        const index = foodList.indexOf(name)
	        filtered[index][name].push(name)
	        const mapped = filtered.map(x => {
	          const food = Object.keys(x)[0]
	          const total = x[food].length
	          return { [food]: total }
	        })
	        const displayList = mapped.sort((a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]])
	        if (rating === 'most') displayList.reverse()
	        this.setState({ displayList: displayList })
	      }
	    })
	  } else if (filter === 'overall') {
	    const filtered = []
	    const foodList = []
	    list.forEach(x => {
	      const name = x.name
	      if (!foodList.includes(name)) {
	        filtered.push({ [name]: 1 })
	        foodList.push(name)
	      } else {
	        const index = foodList.indexOf(name)
	        filtered[index][name] += 1
	      }
	      const displayList = [...filtered]
	      displayList.sort((a, b) => {
	        return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
	      })
	      if (rating === 'most') displayList.reverse()
	      this.setState({ displayList: displayList })
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
