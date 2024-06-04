document.getElementById("search_btn").addEventListener
  ("click", function () {
  let country = document.getElementById("country_input").value;
  fetch("https://restcountries.com/v3.1/name/" + country)
    .then((response) => response.json())
    .then((data) => {
      let countryDetails = document.getElementById("country_details");
      countryDetails.innerHTML = `
                <h2>${data[0].name.common}</h2>
                <img src="${data[0].flags.png}" 
                alt="${data[0].name.common} flag">
                <p>Capital: ${data[0].capital[0]}</p>
                <p>Region: ${data[0].region}</p>
                <p>Subregion: ${data[0].subregion}</p>
                <p>Population: ${data[0].population}</p>
                <p>Area: ${data[0].area} sq km</p>
            `;
      return data[0].region;
    })
    .then((region) => {
      fetch("https://restcountries.com/v3.1/region/" + region)
        .then((response) => response.json())
        .then((data) => {
          let regionCountries = document.getElementById("region_countries");
          regionCountries.innerHTML = "<h2>Countries in the same region:</h2>";
          data.forEach((country) => {
            regionCountries.innerHTML += `
              <p>${country.name.common}</p>
                <img src="${country.flags.png}" 
                  alt="${country.name.common} flag">`;
          });
        });
    });
});
