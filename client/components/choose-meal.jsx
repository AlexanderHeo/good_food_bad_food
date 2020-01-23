import React from 'react';

export default class ChooseMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratefood: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){

  }

  render() {
    return (
      <div className={'container'} style={{width: "375px", height: "667px"}}>
        <div className={'enterEffectDiv'}></div>
        <div className={'bg-primary'}>Choose the food you want to enter effect for:</div>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action">Cras justo odio
            <img src='./images/badFace.jpg' style={{width: "25px", height: "25px", float: "right"}}></img>
          </a>
          <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in
            <img src='./images/happyFace.jpg' style={{width: "25px", height: "25px", float: "right"}}></img>
          </a>
          <a href="#" className="list-group-item list-group-item-action">Morbi leo risus
            <img src='./images/happyFace.jpg' style={{width: "25px", height: "25px", float: "right"}}></img>
          </a>
          <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac
            <img src='./images/neutralFace.jpg' style={{width: "25px", height: "25px", float: "right"}}></img>
          </a>
          <a href="#" className="list-group-item list-group-item-action">Vestibulum at eros
            <img src='./images/neutralFace.jpg' style={{width: "25px", height: "25px", float: "right"}}></img>
          </a>
        </div>
        <button className={'.doneButton'} style={{ float: "left" }}>
          <span>
            Done
          </span>
        </button>
        <button className={'.cancelButton'} style={{float: "right"}}>
          <span>
            Cancel
          </span>
        </button>
      </div>
    );
  }
}
