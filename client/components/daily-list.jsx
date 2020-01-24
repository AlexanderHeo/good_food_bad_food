import React from 'react';

const DailyList = props => {
  return (
    <div className="d-flex">
      {
        props.weekday.map(element =>
          <p className="h3" key={element.eatenAt}> {element.name}
            <img src={element.image} alt={element.image} />
          </p>)
      }
    </div>
  );
};

export default DailyList;
