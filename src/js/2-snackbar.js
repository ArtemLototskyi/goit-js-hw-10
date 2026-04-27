
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const time = Number(event.target.elements.delay.value);
    const value = event.target.elements.state.value;

    if (time === 0) {
        return;
    }

    setTimeout(() => {
        new Promise((resolve, reject) => {
            if (value === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${time}ms`)
            } else {
                reject(`❌ Rejected promise in ${time}ms`
)
    }
        })
            .then((data) => {
                iziToast.show({
                    message: data,
                    color: 'green',
                    position: 'topRight',
                })
            })
            .catch((error) => {
                iziToast.show({
                    message: error,
                    color: 'red',
                    position: 'topRight',
                })
            })
    }, time)
}