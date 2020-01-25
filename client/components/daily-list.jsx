import React from 'react';

const DailyList = props => {
  if (!props.weekday) {
    return null;
  }
  return (
    <div className="d-flex">
      {
        props.weekday.map(element =>
          <p className="h3" key={element.eatenAt}
            onClick={props.onClick ? props.onClick : ''}> {element.name}
            <img src={element.image} alt={element.image} style={{ float: 'right', width: '25px', height: '25px' }} />
          </p>)
      }
    </div>
  );
};

export default DailyList;
