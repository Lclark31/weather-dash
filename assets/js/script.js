let searchLocation = `New York`;
let latitude = localStorage.getItem(`Latitude`);
let longitude = localStorage.getItem(`Longitude`);

let geoFinderApi = `http://open.mapquestapi.com/geocoding/v1/address?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&location=${searchLocation}`;
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=05259468112d1e5fac09c5030fda1d57`;

function getGeoLocation() {
  fetch(geoFinderApi)
    .then((response) => response.json())
    .then(function (data) {
      latitude = data.results[0].locations[0].latLng.lat;
      longitude = data.results[0].locations[0].latLng.lng;
      localStorage.setItem(`Longitude`, longitude.toFixed(2));
      localStorage.setItem(`Latitude`, latitude.toFixed(2));
      console.log(latitude, longitude);
    });
}

function searchWeather() {
  fetch(weatherApiUrl)
    .then((response) => response.json())
    .then(function (data) {
      // code here
    });
}

// geofinder - results -> locations -> latLng

// use the geofinder api to find the lat and lon of the user's search
// use the lat and lon from geofinder to search the location on the openweather api

function readSearch() {
  searchLocation = $(`input`).val();
  console.log($(`input`).val());
}

$(`.search-button`).on(`click`, readSearch);
getGeoLocation();
