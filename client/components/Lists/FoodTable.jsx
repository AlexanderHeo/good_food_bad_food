import React, { Component } from 'react'

class FoodTable extends Component {
	state = { ready: false }

	componentDidUpdate = (prevProps, prevState) => {
	  if (prevProps.list !== this.props.list) {
	    this.setState({ ready: true })
	  }
	}

	render() {
	  let display = null

	  if (this.state.ready) {
	    const { list } = this.props
	    const displayList = list[Object.keys(list)[0]]
	    display = (
	      <table className='foodTable'>
	        <tbody className='foodBody'>

	          {

	            displayList.map(x => {
	              return <tr key={x.eatenAt}>
	                <td>{x.name}</td>
	                <td>{x.report}</td>
	              </tr>
	            })

	          }

	          {/* <tr>
							<td>food item</td>
							<td>5</td>
						</tr>
						<tr>
							<td>food item</td>
							<td>5</td>
						</tr>
						<tr>
							<td>food item</td>
							<td>5</td>
						</tr>
						<tr>
							<td>food item</td>
							<td>5</td>
						</tr>
						<tr>
							<td>food item</td>
							<td>5</td>
						</tr> */}
	        </tbody>
	      </table>
	    )
	  } else {
	    display = <div>loading...</div>
	  }

	  return display
	}
}

export default FoodTable
