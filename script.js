"use strict";

const htmlField = document.getElementById("time-field");
const todayDate = document.querySelector(".date p");
const nextDate = document.querySelectorAll(".next-date");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

setInterval(function () {
  const date = new Date();
  htmlField.innerText = `${(date.getHours() < 10 ? '0' + date.getHours() : date.getHours())}:${(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())}:${(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())}`;
  todayDate.innerHTML = `Today <span>&#183;</span> ${
    days[date.getDay()]
  }, ${date.getDate()} ${months[date.getMonth()]}`;
}, 1000);

const dailyDate = new Date();

for (let i = 1; i <= 4; i++) {
  dailyDate.setDate(dailyDate.getDate() + 1);
  dailyDate.se;
  if (i > 1) {
    nextDate[i - 2].innerText = `${
      days[dailyDate.getDay()]
    }, ${dailyDate.getDate()} ${months[dailyDate.getMonth()]}`;
  }
}
