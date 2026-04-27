
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const time = Number(event.target.elements.delay.value);
    const value = event.target.elements.state.value;

   new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === "fulfilled") {
        resolve(time);
      } else {
        reject(time);
      }
    }, time);
  })
    .then((time) => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${time}ms`,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch((time) => {
      iziToast.show({
        message: `❌ Rejected promise in ${time}ms`,
        color: 'red',
        position: 'topRight',
      });
    });
}