'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var clock = _interopDefault(require('clock'));
var document = _interopDefault(require('document'));
var userActivity = require('user-activity');
var heartRate = require('heart-rate');

var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
function getMonth() {
    var today$$1 = new Date();
    var month = MONTH_NAMES[today$$1.getMonth()];
    return month;
}
function showElement(element) {
    element.style.display = "inline";
}
function hideElement(element) {
    element.style.display = "none";
}
function calculateMoonPhase(date) {
    var lp = 2551443;
    var new_moon = new Date(1970, 0, 7, 20, 35, 0);
    var phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
    return Math.floor(phase / (24 * 3600)) + 1;
}

clock.granularity = "seconds";
var hourHand = document.getElementById("hours");
var minHand = document.getElementById("mins");
var secHand = document.getElementById("secs");
var dateLabel = document.getElementById("dateLabel");
var hrLabel = document.getElementById("hrLabel");
var moonPhaseImage = document.getElementById("moonPhase");
var hiddenButton = document.getElementById("hiddenButton");
var stepsLabel = document.getElementById("stepsLabel");
var day = new Date();
var moonPhase;
function hoursToAngle(hours, minutes) {
    var hourAngle = (360 / 12) * hours;
    var minAngle = (360 / 12 / 60) * minutes;
    return hourAngle + minAngle;
}
function minutesToAngle(minutes) {
    return (360 / 60) * minutes;
}
function secondsToAngle(seconds) {
    return (360 / 60) * seconds;
}
function updateClock() {
    day = new Date();
    var hours = day.getHours() % 12;
    var minutes = day.getMinutes();
    var seconds = day.getSeconds();
    hourHand.groupTransform.rotate.angle = hoursToAngle(hours, minutes);
    minHand.groupTransform.rotate.angle = minutesToAngle(minutes);
    secHand.groupTransform.rotate.angle = secondsToAngle(seconds);
    console.log("hours: " + hours + " minutes: " + minutes + " seconds: " + seconds);
    if (moonPhase == undefined || (hours == 12 && minutes == 0 && seconds == 0)) {
        moonPhase = calculateMoonPhase(day);
        console.log("recalculated moon phase. moon phase is " + moonPhase);
        if (moonPhase < 29) {
            moonPhaseImage.href = "moon-" + moonPhase + ".png";
        }
    }
}
hiddenButton.onactivate = function (evt) {
    stepsLabel.text = "Steps: " + userActivity.today.local.steps;
    showElement(stepsLabel);
    dateLabel.text = getMonth() + " " + day.getDate() + " " + day.getFullYear();
    showElement(dateLabel);
    showElement(hrLabel);
    setTimeout(function () {
        hideElement(stepsLabel);
        hideElement(dateLabel);
        hideElement(hrLabel);
    }, 2000);
};
hideElement(stepsLabel);
hideElement(dateLabel);
hideElement(hrLabel);
clock.ontick = function () { return updateClock(); };
var hrm = new heartRate.HeartRateSensor();
hrm.onreading = function () {
    hrLabel.text = "Heart Rate: " + hrm.heartRate;
};
hrm.start();
