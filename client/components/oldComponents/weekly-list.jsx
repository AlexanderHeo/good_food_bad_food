import React from 'react';

class WeeklyList extends React.Component {
  getAverage() {
    const days = [0, 1, 2, 3, 4, 5, 6];
    const week = this.props.week;
    if (!week) return null;
    const statusList = days.map(day => {
      const meals = week.filter(meal => {
        return new Date(meal.eatenAt).getDay() === day;
      });
      const averageReport = meals.reduce((a, c) => Math.ceil(a + c.report), 0);
      const length = meals.filter(meal => meal.report).length;
      return Math.ceil(averageReport / length) || null;
    });
    return statusList;
  }

  render() {
    const weekAverage = this.getAverage();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const imageSource = ['/images/badFace.jpg', '/images/neutralFace.jpg', '/images/happyFace.jpg'];
    return (
      <div className="effectsBox ml-2">
        {
          weekAverage.map((element, index) =>
            <div className={`${weekdays[index]} mt-1 d-flex`} key={weekdays[index]}>
              <div className="d-flex justify-content-center">
                <p className="ml-5 float-left">{weekdays[index]}</p>
                <img className="ml-5 float-right" src={imageSource[element - 1]} alt={element} />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default WeeklyList;