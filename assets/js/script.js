let searchLocation = `Milwaukee`;
let lat;
let lon;

let geoFinderApi = `http://open.mapquestapi.com/geocoding/v1/address?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&location=${searchLocation}`;
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=05259468112d1e5fac09c5030fda1d57`;

function you() {
  fetch(geoFinderApi)
    .then((response) => response.json())
    .then((data) => console.log(`Geolocation`, data.results[0].locations[0].latLng));
}

function me() {
  fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// geofinder - results -> locations -> latLng

// use the geofinder api to find the lat and lon of the user's search
// use the lat and lon from geofinder to search the location on the openweather api

// function consoley() {
//   console.log(searchLocation);
// }

// $(`.search-button`).on(`click`, consoley);
// results[0].locations[0].latLng;
