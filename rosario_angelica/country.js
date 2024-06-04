const countryInput = document.getElementById('country_input');
const searchBtn = document.getElementById('search_btn');
const countryDetails = document.getElementById('country_details');
const regionCountries = document.getElementById('region_countries');


const BASE_URL = 'https://restcountries.com/v3.1';

searchBtn.addEventListener('click', searchCountry);


async function searchCountry() {
  const countryName = countryInput.value.trim();
  if (countryName) {
    try {
      const response = await fetch(`${BASE_URL}/name/${countryName}`);
      const data = await response.json();

      if (data.length > 0) {
        const country = data[0];
        const selectedDetails = [
          { label: 'Flag', value: `<img src="${country.flags.png}" 
          alt="${country.name.common}">` },
          { label: 'Name', value: country.name.common },
          { label: 'Capital', value: country.capital || 'N/A' },
          { label: 'Population', value: country.population.toLocaleString() },
          { label: 'Area', value: `${country.area.toLocaleString()} km²` },
          { label: 'Currency', value: country.currencies ? Object.values
          (country.currencies)[0].name : 'N/A' },
        ];

        const region = country.region;
        displayCountryDetails(selectedDetails);
        fetchRegionCountries(region);
      } else {
        countryDetails.innerHTML = '<p>No country found.</p>';
        regionCountries.innerHTML = '';
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
      countryDetails.innerHTML = '<p>Error fetching country data.</p>';
      regionCountries.innerHTML = '';
    }
  }
}


function displayCountryDetails(details) {
  const detailsHTML = details.map(detail => `<p><strong>${detail.label}:
    </strong> ${detail.value}</p>`).join('');
  countryDetails.innerHTML = `<h3>Country Details</h3>${detailsHTML}`;
}

async function fetchRegionCountries(region) {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    const data = await response.json();

    const countryNames = data.map(country => country.name.common);
    const countriesHTML = countryNames.map(name => `<li>
     ${name}</li>`).join('');
    regionCountries.innerHTML = `<h3>Countries in the ${region} 
    Region</h3><ul>${countriesHTML}</ul>`;
  } catch (error) {
    console.error('Error fetching region countries:', error);
    regionCountries.innerHTML = '<p>Error fetching region countries.</p>';
  }
}