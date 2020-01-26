import React from 'react';

function ListMeals(props) {
  return (
    props.todaysMeals.map(x => {
      return (
        <div className="" key={x}>
          <span>{ x }</span>
          <input type="button"
            className="btn btn-danger"
            value="Remove"
            onClick={ () => props.onSubmit(x)}
          />
        </div>
      );
    })
  );
}

export default ListMeals;
