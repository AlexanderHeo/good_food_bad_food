export const dateFormatter = (date) => {
  const timestamp = date;
  let getDate = date.getDate();
  if (getDate.toString().length === 1) {
    getDate = `0${parseInt(getDate)}`;
  }
  let month = date.getMonth() + 1;
  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  const year = date.getFullYear();
  const dayNum = date.getDay();
  const day = getDayName(dayNum);
  const fullDate = `${year}-${month}-${getDate}`;
  const display = `${month} / ${getDate}`;
  const returnDate = {
    fullDate,
    display,
    day,
    timestamp
  };
  return returnDate;
};

export const sundayFormatter = (date) => {
  const timestamp = new Date(date);
  const dayNum = timestamp.getDay();
  const sunday = timestamp.setHours(timestamp.getHours() - 24 * dayNum);
  const newSunday = new Date(sunday);
  const sundayDate = new Date(new Date(newSunday).setHours(0, 0, 0, 0));

  const sundayDayNum = sundayDate.getDay();
  const day = getDayName(sundayDayNum);

  let sundayDateNum = sundayDate.getDate();
  if (sundayDateNum.toString().length === 1) {
    sundayDateNum = `0${sundayDateNum}`;
  }
  let sundayMonth = sundayDate.getMonth() + 1;
  if (sundayMonth.toString().length === 1) {
    sundayMonth = `0${sundayMonth}`;
  }
  const sundayYear = sundayDate.getFullYear();

  const fullDate = `${sundayYear}-${sundayMonth}-${sundayDateNum}`;
  const display = `${sundayMonth} / ${sundayDateNum}`;

  const returnDate = {
    fullDate,
    display,
    day,
    timestamp
  };
  return returnDate;
};

const getDayName = (dayNum) => {
  let dayName;
  switch (dayNum) {
    case 0:
      dayName = 'Sunday';
      break;
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
    default:
      dayName = 'Someday';
  }
  return dayName;
};
