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
            onClick={props.onClick ? props.onClick : null}> {element.name}
            <img src={element.image} alt={element.image} />
          </p>)
      }
    </div>
  );
};

export default DailyList;
