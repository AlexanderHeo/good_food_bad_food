import React, { Component } from 'react'
import styled from 'styled-components'

class ListDisplay extends Component {
  render() {
    let display = null
    const { displayList, level1, level2 } = this.props
    if ((level1 === 'most' || level1 === 'least') && level2 === 'meal') {
      display = <h1>not set up to display this yet. please come back soon.</h1>
    } else {
      display = <div>
        {
          displayList.map(x => {
            const k = [Object.keys(x)[0]]
            const v = x[Object.keys(x)[0]]
            return (
              <ul key={`${k}${v}${Math.random() * 10}`}>
                <li>{ k }</li>
                <li>{ v }</li>
              </ul>
            )
          })
      	}
      </div>
    }

    return (
      <Container>
        { display }
      </Container>
    )
  }
}

export default ListDisplay

const Container = styled.div`

`
