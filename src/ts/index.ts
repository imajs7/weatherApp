import api from './config.js';
/*
    config.js file contains secret api key
    hence the file is added to .gitignore

    moderated content of config.js file

    const api = {
        base: 'https://api.openweathermap.org/data/2.5/weather?units=metric',
        key: '{secret-api-key}'
    };

    export default api;

*/
type weatherFunction = ( city : string ) => void;
type displayFunction = ( {} ) => void;

const generateDate = () => {

    console.log( 'generateDate() called' );

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

const displayData : displayFunction = result => {
    console.log( 'displayData() called' );
    const location = document.querySelector("#location") as HTMLElement;
    const temp = document.querySelector("#temp") as HTMLElement;
    const dayType = document.querySelector("#dayType") as HTMLElement;
    const minSpan = document.querySelector("#min") as HTMLElement;
    const maxSpan = document.querySelector("#max") as HTMLElement;
    const date = document.querySelector("#date") as HTMLElement;

    location.innerText = result.name + ', ' + result.sys.country;
    temp.innerText = String( Math.floor( result.main.temp ) );
    dayType.innerText = result.weather[0].main;
    minSpan.innerText = String( Math.floor( result.main.temp_min ) ); 
    maxSpan.innerText = String( Math.floor( result.main.temp_max ) );
    date.innerText = generateDate();
};

const getWeather : weatherFunction = async ( city ) => {
    console.log( 'getWeather() called' );
    try {
        const response = await fetch( `${api.base}&q=${city}&appid=${api.key}` );
        let weather = await response.json();
        displayData( weather );
    } catch ( error ) {
        console.log( error.message );
    }
};

let input = document.querySelector('#city') as HTMLElement;

input.addEventListener( 'keydown', event => {
    console.log( 'input.eventListener called' );
    if( event.key == 'Enter' ) {
        getWeather( event.target.value );
    }
} );
