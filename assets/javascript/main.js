(function() {
  "use strict";

  // Global Variables
  var currentDate;
  var hours;
  var minutes;
  var seconds;
  var timeArray;

  var $hours = document.querySelector(".clock .hours");
  var $minutes = document.querySelector(".clock .minutes");
  var $seconds = document.querySelector(".clock .seconds");




  function getTime() {
    currentDate = new Date(); // Assigns current date and time as a new Date object to variable
    hours = currentDate.getHours();
    minutes = currentDate.getMinutes();
    seconds = currentDate.getSeconds();
    timeArray = [hours, minutes, seconds];
  }

  //Function that returns time unit as a two-digit number if it is less than 10.  credit: http://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit users: nickolusroy, apfz
  function setTimeFormat(unitOfTime, index, array) {
    var twoDigitTime = unitOfTime >= 10 ? unitOfTime : "0"+ unitOfTime.toString();
    array[index] = twoDigitTime;
  }

  function logTime() {
    getTime();
    timeArray.forEach(setTimeFormat);
    console.log(timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]);
  }

  setInterval(logTime, 1000);
})();
