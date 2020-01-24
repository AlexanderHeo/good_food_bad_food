import React from 'react'

function SingleMeal(){
  // console.log("this.props.meals: ", this.props.meals)
  // console.log("props.meals: ", props.meals)
  return (
    <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action" >Pizza
        <img src='./images/badFace.jpg' style={{ width: '25px', height: '25px', float: 'right' }}></img>
      </a>
    </div>
  )
}

export default SingleMeal
