var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import api from './config.js';
const generateDate = () => {
    console.log('generateDate() called');
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let today = new Date();
    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();
    return `${day} ${date} ${month} ${year}`;
};
const displayData = result => {
    console.log('displayData() called');
    const location = document.querySelector("#location");
    const temp = document.querySelector("#temp");
    const dayType = document.querySelector("#dayType");
    const minSpan = document.querySelector("#min");
    const maxSpan = document.querySelector("#max");
    const date = document.querySelector("#date");
    location.innerText = result.name + ', ' + result.sys.country;
    temp.innerText = String(Math.floor(result.main.temp));
    dayType.innerText = result.weather[0].main;
    minSpan.innerText = String(Math.floor(result.main.temp_min));
    maxSpan.innerText = String(Math.floor(result.main.temp_max));
    date.innerText = generateDate();
};
const getWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getWeather() called');
    try {
        const response = yield fetch(`${api.base}&q=${city}&appid=${api.key}`);
        let weather = yield response.json();
        displayData(weather);
    }
    catch (error) {
        console.log(error.message);
    }
});
let input = document.querySelector('#city');
input.addEventListener('keydown', event => {
    console.log('input.eventListener called');
    if (event.key == 'Enter') {
        getWeather(event.target.value);
    }
});
