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

    hexColor = hoursHex + minutesHex + secondsHex;
    return hexColor.toString();
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

  //Function to "programmatically lighten or darken a hex color by a specific amount. Just pass in a string like "3F6D2A" for the color (col) and an base10 integer (amt) for the amount to lighten or darken. To darken, pass in a negative number (i.e. -20)."

  function lightenDarkenColor(col,amt) {
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
  }

//Displays time to spans within page's clock element and resizes <hr> corresponding to seconds w/ getPercentOfMinute()
  function displayTime() {
    var timerBarSize; //Size to set $timerBar to
    var hexHours;
    var hexMinutes;
    var hexSeconds;
    var hexColorFrom;
    var hexColorTo;

    getTime();
    timeArray.forEach(setDigitFormatArray);
    //console.log(timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]);
    $hours.textContent = timeArray[0];
    $minutes.textContent = timeArray[1];
    $seconds.textContent = timeArray[2];

    timerBarSize = getPercentOfMinute(timeArray[2]);

    $timerBar.style.width = (timerBarSize * 100) + "%";

    hexHours = getHexValue(timeArray[0]);
    hexMinutes = getHexValue(timeArray[1]);
    hexSeconds = getHexValue(timeArray[2]);
    hexHours = setDigitFormatString(hexHours);
    hexMinutes = setDigitFormatString(hexMinutes);
    hexSeconds = setDigitFormatString(hexSeconds);
    hexColorTo = getHexColor(hexHours, hexMinutes, hexSeconds);
    hexColorFrom = lightenDarkenColor(hexColorTo, 50);


    document.body.style.backgroundImage = "-webkit-gradient(radial, 50% 50%, 200, 50% 50%, 700, from(#" + hexColorFrom + "), to(#" + hexColorTo + "))";
  }

  setInterval(logTime, 1000);
  setInterval(displayTime, 100);

})();
