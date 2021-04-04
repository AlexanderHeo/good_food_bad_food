export const displayFormatter = (list, todayDate) => {
  todayDate.timestamp.setHours(0, 0, 0, 0);
  const today = list.filter((x) => {
    const t = new Date(x.eatenAt);
    if (t > todayDate.timestamp) {
      return x;
    }
  });
  return today;
};

export const weekDisplay = (list, sundayDate) => {
  sundayDate.timestamp.setHours(0, 0, 0, 0);

  const week = list.filter((x) => {
    const eat = new Date(x.eatenAt);
    const sun = sundayDate.timestamp;
    if (eat >= sun) {
      return x;
    }
  });

  const sun = [];
  const mon = [];
  const tue = [];
  const wed = [];
  const thu = [];
  const fri = [];
  const sat = [];
  let dDay;
  week.forEach((x) => {
    const d = new Date(x.eatenAt);
    dDay = d.getDay();
    switch (dDay) {
      case 0:
        sun.push(x);
        break;
      case 1:
        mon.push(x);
        break;
      case 2:
        tue.push(x);
        break;
      case 3:
        wed.push(x);
        break;
      case 4:
        thu.push(x);
        break;
      case 5:
        fri.push(x);
        break;
      case 6:
        sat.push(x);
        break;
      default:
        break;
    }
  });
  return [mon, tue, wed, thu, fri, sat];
};
