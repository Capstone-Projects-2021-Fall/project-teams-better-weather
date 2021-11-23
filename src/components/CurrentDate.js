export default function CurrentDate(time) {
  var currDate = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date =
    days[currDate.getDay()] +
    " " +
    months[currDate.getMonth()] +
    " " +
    currDate.getDate() +
    ", " +
    currDate.getFullYear();
  const newCurrDate = date;

  return <div>{newCurrDate}</div>;
}
