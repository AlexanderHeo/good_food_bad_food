import React from 'react';

function ListMeals(props) {
  return (
    props.todaysMeals.map(x => {
      return (
        <div className="listMeals d-flex" key={x}>
          <p>{ x }</p>
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
