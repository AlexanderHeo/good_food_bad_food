import React from 'react';

function ListMeals(props) {
  return (
    props.todaysMeals.map(x => {
      return (
        <div className="listMeals mt-2" key={x}>
          <span>{ x }</span>
          <button
            className="btn btn-danger"
            value="Remove"
            onClick={ () => props.onSubmit(x)}
          >Remove</button>
        </div>
      );
    })
  );
}

export default ListMeals;
