import clock from "clock";
import document from "document";
import { today } from "user-activity";

import * as util from "../common/utils";

clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let dateLabel = document.getElementById("dateLabel");

let hiddenButton = document.getElementById("hiddenButton");
let stepsLabel = document.getElementById("stepsLabel");

let day = new Date();

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  day = new Date();
  let hours = day.getHours() % 12;
  let mins = day.getMinutes();
  let secs = day.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

hiddenButton.onactivate = function(evt) {
  stepsLabel.text = `Steps: ${today.local.steps}`
  stepsLabel.style.display = "inline";
  
  dateLabel.style.display = "inline";
  dateLabel.text = `${util.getMonth()} ${day.getDate()} ${day.getFullYear()}`;
  
  setTimeout(function() {
    stepsLabel.style.display = "none";
    dateLabel.style.display = "none";
  }, 2000);
}

stepsLabel.style.display = "none";
dateLabel.style.display = "none";

// Update the clock every tick event
clock.ontick = () => updateClock();
