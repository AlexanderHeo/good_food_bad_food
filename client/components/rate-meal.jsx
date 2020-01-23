import React from 'React'
import { render } from 'react-dom'

export default class RateMeal extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className={'container'} style={{ width: "375px", height: "667px" }}>
        <div className={'bg-warning'}>How did it make you feel?</div>
        <div className={'bg-info'}>FOOD ITEM NAME</div>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action">Good
            <img src='./images/happyFace.jpg' style={{ width: "25px", height: "25px", float: "right" }}></img>
          </a>
          <a href="#" className="list-group-item list-group-item-action">Ok
            <img src='./images/neutralFace.jpg' style={{ width: "25px", height: "25px", float: "right" }}></img>
          </a>
          <a href="#" className="list-group-item list-group-item-action">Bad
            <img src='./images/badFace.jpg' style={{ width: "25px", height: "25px", float: "right" }}></img>
          </a>
        </div>
      </div>
    )
  };
};
