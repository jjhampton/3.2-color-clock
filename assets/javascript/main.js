(function() {
  "use strict";

  //DOM elements
  var $clock = document.querySelector(".clock");
  var $hours = document.querySelector(".clock .hours");
  var $minutes = document.querySelector(".clock .minutes");
  var $seconds = document.querySelector(".clock .seconds");

  //Returns an array containing current time in hours, minutes, & seconds.
  function getTime() {
    var currentDate;
    var currentTime;
    var hours;
    var minutes;
    var seconds;

    currentDate = new Date(); // Assigns current date and time as a new Date object to variable
    currentTime = [currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()];
    return currentTime;
  }

  //Callback function to use w/ array.forEach().  Checks array's index values to see if they are less than 10, and if not, adds "0" to them, and re-inserts them into the array.  credit: http://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit users: nickolusroy, apfz
  function formatDigitArray(unitOfTime, index, array) {
    var twoDigit = unitOfTime >= 10 ? unitOfTime : "0" + unitOfTime.toString();
    array[index] = twoDigit;
  }

  //Setter function for String, similar to previous array function.  If string is not two-digits, prepends "0".  Returns two-digit string.
  function formatDigitString(string) {
    var twoDigit = (string.length > 1) ? string : "0" + string;
    return twoDigit;
  }

  //returns percentage of a minute that the current seconds represents
  function getPercentOfMinute(seconds) {
    seconds = Number(seconds);
    var percent = seconds / 60;
    return percent;
  }

  //Returns a string of a two-digit hexadecimal byte value that a unit of time represents
  function getHexByte(unitOfTime) {
    var hexValue;
    hexValue = unitOfTime.toString(16);
    return hexValue;
  }

  //Returns a string of the hex triplet combined from three separate hex bytes
  function getHexTriplet(hexByte1, hexByte2, hexByte3) {
    var hexTriplet;

    hexTriplet = (hexByte1 + hexByte2 + hexByte3).toString();
    return hexTriplet;
  }

  //Logs time and percent/minute to the console
  function logTime() {
    var currentTime;
    var hexColor;

    currentTime = getTime();
    currentTime.forEach(formatDigitArray);
    console.log(currentTime[0] + ":" + currentTime[1] + ":" +  currentTime[2]);
    console.log(getPercentOfMinute(currentTime[2]));

    currentTime = currentTime.map(getHexByte);
    currentTime = currentTime.map(formatDigitString);
    hexColor = getHexTriplet(currentTime[0], currentTime[1], currentTime[2]);
    console.log(hexColor);
  }

  //Function to "programmatically lighten or darken a hex color by a specific amount. Just pass in a string like "3F6D2A" for the color (col) and an base10 integer (amt) for the amount to lighten or darken. To darken, pass in a negative number (i.e. -20)." credit: http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

  function lightenDarkenColor(col,amt) {
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
  }

  //Displays time to spans within page's clock element.  Resizes <hr> corresponding to seconds w/ getPercentOfMinute().  Calls helper functions to generate hexadecimal color from screen time and set hex values for page's background gradient.
  function displayToScreen() {
    var currentTime;
    var timerBarSize; //Size to set $timerBar to
    var hexColorTo;
    var hexColorFrom;


    var $timerBar = document.querySelector(".timer-bar");

    //Get current time and set units as properties for the corresponding HTML elements
    currentTime = getTime();
    currentTime.forEach(formatDigitArray);
    $hours.textContent = currentTime[0];
    $minutes.textContent = currentTime[1];
    $seconds.textContent = currentTime[2];

    //Get percent of current minute and set it as the width property of the timer-bar <hr>
    timerBarSize = getPercentOfMinute(currentTime[2]);
    $timerBar.style.width = (timerBarSize * 100) + "%";

    //Generate hex values from current time
    currentTime = currentTime.map(getHexByte);
    currentTime = currentTime.map(formatDigitString);

    // Determine hex color to use for the to and from gradients
    hexColorTo = getHexTriplet(currentTime[0], currentTime[1], currentTime[2]);
    hexColorFrom = lightenDarkenColor(hexColorTo, 50);

    //Assign hex colors to gradients
    document.body.style.backgroundImage = "-webkit-gradient(radial, 50% 50%, 200, 50% 50%, 700, from(#" + hexColorFrom + "), to(#" + hexColorTo + "))";
  }

  function clockMouseOver() {
    var currentTime;

    currentTime = getTime();
    currentTime.forEach(formatDigitArray);
    currentTime = currentTime.map(getHexByte);
    currentTime = currentTime.map(formatDigitString);

    $hours.textContent = currentTime[0].toUpperCase();
    $minutes.textContent = currentTime[1].toUpperCase();
    $seconds.textContent = currentTime[2].toUpperCase();
  }

  //Bind event listener to mouseenter on $clock
  $clock.addEventListener('mouseenter', clockMouseOver, false);
  //Set console to log data every second
  setInterval(logTime, 1000);
  //Set screen display to be updated every second
  setInterval(displayToScreen, 1000);

})();
