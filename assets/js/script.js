function readSearch() {
  let searchLocation = $(`input`).val();
  let latitude = localStorage.getItem(`Latitude`);
  let longitude = localStorage.getItem(`Longitude`);
  let date = moment().format(`(DD/MM/YYYY)`);
  let verifiedLocation;
  let icon;
  let weatherArray = [];
  let weatherApiUrl;
  let iconImage;
  let geoFinderApi = `http://open.mapquestapi.com/geocoding/v1/address?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&location=${searchLocation}`;

  if (searchLocation === undefined || searchLocation === ``) {
    return;
  } else {
    getGeoLocation();
  }

  function getGeoLocation() {
    fetch(geoFinderApi)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        console.log(data.results[0].locations[0].latLng.lat);

        latitude = data.results[0].locations[0].latLng.lat;
        longitude = data.results[0].locations[0].latLng.lng;

        localStorage.clear();
        localStorage.setItem(`Longitude`, longitude);
        localStorage.setItem(`Latitude`, latitude);
        verifiedLocation = data.results[0].locations[0].adminArea5;
        if (verifiedLocation === ``) {
          alert(`Coulnd't find your city`);
          return;
        } else {
          console.log(verifiedLocation);
          localStorage.setItem(`Location`, verifiedLocation);
        }

        searchWeather();
      });
  }

  function searchWeather() {
    weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&units=imperial&appid=05259468112d1e5fac09c5030fda1d57`;
    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then(function (data) {
        if (data === undefined) {
          alert(`Couldn't find that city`);
          return;
        } else {
          weatherArray.push(`${data.current.temp}°F`);
          weatherArray.push(`${data.current.wind_speed} MPH`);
          weatherArray.push(`${data.current.humidity}%`);
          weatherArray.push(data.current.uvi);
          weatherArray.push(data.current.weather[0].icon);

          localStorage.setItem(`Weather`, JSON.stringify(weatherArray));
        }
        displayWeather();
      });
  }

  function displayWeather() {
    weatherArray = JSON.parse(localStorage.getItem(`Weather`));
    verifiedLocation = localStorage.getItem(`Location`);

    icon = weatherArray[4];
    iconImage = $(`<img>`).attr(`src`, `http://openweathermap.org/img/wn/${icon}@2x.png`);
    uvi = parseInt(weatherArray[3]);

    $(`.city`).text(`${verifiedLocation} ${date}`);
    $(`.city`).append(iconImage);

    $(`.temp`).text(`Temp: ${weatherArray[0]}`);
    $(`.wind`).text(`Wind: ${weatherArray[1]}`);
    $(`.humidity`).text(`Humidity: ${weatherArray[2]}`);
    $(`.uv-index`).text(`UV Index: ${weatherArray[3]}`);
    if (uvi <= 2) {
      console.log(`low`);
    } else if (uvi >= 3 && uvi <= 5) {
      console.log(`moderate`);
    } else {
      console.log(`high`);
    }
  }
}
$(`.search-button`).on(`click`, readSearch);

$(`.city-search`).on(`submit`, function (event) {
  event.preventDefault();
  readSearch();
  $(`.search-bar`).val(``);
});
