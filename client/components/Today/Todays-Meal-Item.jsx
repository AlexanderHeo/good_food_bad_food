import React from 'react';
import styled from 'styled-components';
import RatingDisplay from '../Rating/RatingDisplay';

const TodaysMealItem = (props) => {
  const first = props.mealtime.charAt(0).toUpperCase();
  return (
    <Container onClick={() => props.handleClick('enter', props.mealtime)} className="meal">
      <div className="mealName">
        <span>
          <div className="outerRing">
            <div className="innerRing">
              <span className="first">{first}</span>
            </div>
          </div>
        </span>
      </div>
      <div className="foodItems">
        <span className="food">{props.food.name}</span>
      </div>
      <div className="mealRating">
        <RatingDisplay rating={props.food.report} />
      </div>
      <div className="buttonContainer">
        <span className="iconify" data-icon="octicon-trashcan" data-inline="false" />
      </div>
    </Container>
  );
};

export default TodaysMealItem;

const Container = styled.button`
  .first {
    font-size: 1.8rem;
    font-weight: 700;
  }
  .outerRing,
  .innerRing {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .outerRing {
    width: 44px;
    height: 44px;
    background-color: var(--primary-6);
  }
  .innerRing {
    width: 36px;
    height: 36px;
    background-color: var(--primary-0);
  }
  .mealName,
  .foodItems,
  .mealRating {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mealName {
    width: 20%;
  }
  .foodItems {
    width: 60%;
  }
  .foodItems .food {
    font-size: 1.4rem;
  }
  .mealRating {
    width: 20%;
  }

  .buttonContainer {
    display: flex;
    .iconify {
      width: 38px;
      height: 38px;
    }
  }
`;
