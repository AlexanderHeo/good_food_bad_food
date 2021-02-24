import React from 'react';

const Header = props => {
  if (!props.weekday[0]) return null;
  return (
    <div className="row">
      <h1 className="seeToday">{props.weekday.toUpperCase()}</h1>
    </div>
  );
};

export default Header;
