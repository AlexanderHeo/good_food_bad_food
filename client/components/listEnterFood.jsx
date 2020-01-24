import React from 'react';

function ListMeals(props) {
  return (
    props.todaysMeals.map(x => {
      return (
        <div className="" key={x}>
          <span>{ x }</span>
        </div>
      );
    })
  );
}

export default ListMeals;
