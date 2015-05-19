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
  var $timerBar = document.querySelector(".timer-bar");



  function getTime() {
    currentDate = new Date(); // Assigns current date and time as a new Date object to variable
    hours = currentDate.getHours();
    minutes = currentDate.getMinutes();
    seconds = currentDate.getSeconds();
    timeArray = [hours, minutes, seconds];
  }

  //Function that returns input value as a two-digit number if it is less than 10.  credit: http://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit users: nickolusroy, apfz
  function setDigitFormatArray(unitOfTime, index, array) {
    var twoDigit = unitOfTime >= 10 ? unitOfTime : "0" + unitOfTime.toString();
    array[index] = twoDigit;
  }

  function setDigitFormatString(string) {
    var twoDigit = (string.length > 1) ? string : "0" + string;
    return twoDigit;
  }

  //logs percentage of a minute that the current seconds represents
  function logPercentOfMinute(seconds) {
    var percent;

    seconds = Number(seconds);
    percent = seconds / 60;
    console.log(percent);
  }

  //returns hexadecimal value that the current unit of time represents
  function getHexValue(unitOfTime) {
    var hexValue;
    hexValue = unitOfTime.toString(16);
    return hexValue;
  }

  //returns a string of the complete hexadecimal color that the hex values for each unit of time represents
  function getHexColor(hoursHex, minutesHex, secondsHex) {
    var hexColor;

    hexColor = "#" + hoursHex + minutesHex + secondsHex;
    return hexColor;
  }

  //Logs time and percent/minute to the console
  function logTime() {
    var hexHours;
    var hexMinutes;
    var hexSeconds;
    var hexColor;

    getTime();
    timeArray.forEach(setDigitFormatArray);
    console.log(timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]);
    logPercentOfMinute(timeArray[2]);
    hexHours = getHexValue(timeArray[0]);
    hexMinutes = getHexValue(timeArray[1]);
    hexSeconds = getHexValue(timeArray[2]);
    hexHours = setDigitFormatString(hexHours);
    hexMinutes = setDigitFormatString(hexMinutes);
    hexSeconds = setDigitFormatString(hexSeconds);
    hexColor = getHexColor(hexHours, hexMinutes, hexSeconds);

    console.log(hexColor);
  }

  //returns percentage of a minute that the current seconds represents
  function getPercentOfMinute(seconds) {
    seconds = Number(seconds);
    var percent = seconds / 60;
    return percent;
  }





  //Displays time to spans within page's clock element and resizes <hr> corresponding to seconds w/ getPercentOfMinute()
  function displayTime() {
    var timerBarSize; //Size to set $timerBar to

    getTime();
    timeArray.forEach(setDigitFormatArray);
    //console.log(timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]);
    $hours.textContent = timeArray[0];
    $minutes.textContent = timeArray[1];
    $seconds.textContent = timeArray[2];

    timerBarSize = getPercentOfMinute(timeArray[2]);
    $timerBar.style.width = (timerBarSize * 100) + "%";
  }

  setInterval(logTime, 1000);
  setInterval(displayTime, 1000);

})();
