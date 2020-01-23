import React from 'react'

export default class ReportMeal extends React.Component {
  constructor(props){
    super(props)
  }

  // componentDidMount(){

  // }

  render(){
    return (
      <div className={'container'}>
        <div className={'EnterEffectDiv'}></div>
        <div>Choose the food you want to enter effect for:</div>
        <ul class="list-group">
          <li class="list-group-item active">Food One</li>
          <li class="list-group-item">Food Two</li>
          <li class="list-group-item">Food Three</li>
          <li class="list-group-item">Food Four</li>
          <li class="list-group-item">Food Five</li>
        </ul>
      </div>
    )
  }
}
