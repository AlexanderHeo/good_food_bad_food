import React, { Component } from 'react'
import styled from 'styled-components'

class ListDisplay extends Component {
  render() {
    let display = null
    const { displayList, level1, level2 } = this.props
    if ((level1 === 'most' || level1 === 'least') && level2 === 'meal') {
      const keys = Object.keys(displayList)
      display = <div>
        {
          keys.map((x, index) => {
            return (
              <div key={`${x}${Math.random() * 10}`}>
                <div>{ x }</div>
                <div>
                  {
                    displayList[keys[index]].map(z => {
                      const k = Object.keys(z)[0]
                      const v = z[Object.keys(z)[0]]
                      return (
                        <ul key={`${k}${v}${Math.random() * 10}`}>
                          <li>{ k }</li>
                          <li>{ v }</li>
                        </ul>
                      )
                    })
                  }
                </div>
            	</div>
            )
          })
        }
      </div>
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
