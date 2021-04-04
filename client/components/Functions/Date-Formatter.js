const Formatter = (dateToFormat) => {
  const date = dateToFormat.getDate();
  let month = dateToFormat.getMonth() + 1;
  const year = dateToFormat.getFullYear();
  if (month.toString().length < 2) {
    month = '0' + month.toString();
  }
  return `${year}-${month}-${date}`;
};

export default Formatter;
