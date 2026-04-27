import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysFiled = document.querySelector("span[data-days]");
const hoursFiled = document.querySelector("span[data-hours]");
const minutesFiled = document.querySelector("span[data-minutes]");
const secondsFiled = document.querySelector("span[data-seconds]");

startBtn.addEventListener("click", handleStart);

startBtn.disabled = false;
let userSelectedDate = null;
let intervalID = null;

flatpickr(datetimePicker, {
    enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
     const currentDate = Date.now();

        userSelectedDate = selectedDates[0].getTime(); 
        
        if (userSelectedDate <= currentDate) {
            iziToast.show({
                message: 'What would you like to add?',
                color: 'red',
                position: 'topRight',
            });
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false;
  },
})

function handleStart() {
    startBtn.disabled = true;
    datetimePicker.disabled = true;

   intervalID = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;
        
       if (deltaTime <= 0) {
           clearInterval(intervalID);
            datetimePicker.disabled = false;
            iziToast.show({
                message: 'What would you like to add?',
                color: 'green',
                position: 'topRight',
            });
            return;
       }
       
       const objTime = convertMs(deltaTime);
       markupTimer(objTime);
    }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function markupTimer({ days, hours, minutes, seconds }) {
    daysFiled.textContent = String(days).padStart(2, "0");
    hoursFiled.textContent = String(hours).padStart(2, "0");
    minutesFiled.textContent = String(minutes).padStart(2, "0");
    secondsFiled.textContent = String(seconds).padStart(2, "0");
}