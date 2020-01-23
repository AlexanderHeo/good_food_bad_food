import React from 'react';

export default class ReportMeal extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount(){

  // }

  render() {
    return (
      <div className={'container'}>
        <div className={'EnterEffectDiv'}></div>
        <div>Choose the food you want to enter effect for:</div>
        <ul className="list-group">
          <li className="list-group-item active">Food One</li>
          <li className="list-group-item">Food Two</li>
          <li className="list-group-item">Food Three</li>
          <li className="list-group-item">Food Four</li>
          <li className="list-group-item">Food Five</li>
        </ul>
      </div>
    );
  }
}
