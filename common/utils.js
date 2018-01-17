// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export function getMonth() {
  let today = new Date();
  let month = MONTH_NAMES[today.getMonth()];
  return month;
}

export function showElement(element) {
  element.style.display = "inline";
}

export function hideElement(element) {
  element.style.display  = "none";
}
