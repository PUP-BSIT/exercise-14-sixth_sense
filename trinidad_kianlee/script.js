let comments = [];

function checkComment() {
  const userName = document.querySelector("#user_name").value;
  const userComment = document.querySelector("#user_comment").value;
  const commentButton = document.querySelector("#comment_button");

  commentButton.disabled = !(userName && userComment);
}

function addComment() {
  const userName = document.querySelector("#user_name").value;
  const userComment = document.querySelector("#user_comment").value;
  const timestamp = new Date().toISOString();

  const comment = {
    name: userName,
    text: userComment,
    date: timestamp,
  };

  comments.push(comment);
  displayComments();
  clearForm();
}

function clearForm() {
  document.querySelector("#user_name").value = "";
  document.querySelector("#user_comment").value = "";
  document.querySelector("#comment_button").disabled = true;
}

function displayComments() {
  const commentsList = document.querySelector("#comments_list");
  commentsList.innerHTML = comments
    .map(
      (comment) => `<div class="comment-item">
      <div>
        <span class="comment-author">${comment.name}</span>&nbsp;
        <span class="comment-date">${new Date(comment.date).toLocaleString()}
      </span>
      </div>
      <p class="comment-text">${comment.text}</p></div>`).join("");
}

function sortComments(order) {
  comments.sort((a, b) =>
    order === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );
  displayComments();
}

function handleSortChange() {
  const sortOrder = document.querySelector("#sort_dropdown").value;
  sortComments(sortOrder);
}

document.getElementById("search_button").addEventListener("click", function(){
  var country = document.getElementById("country_input").value;
  fetch("https://restcountries.com/v3.1/name/" + country)
    .then((response) => response.json())
    .then((data) => {
      let countryDetails = document.getElementById("country_details");
      countryDetails.innerHTML = `
          <h2>${data[0].name.common}</h2>
          <img src="${data[0].flags.png}" alt="${data[0].name.common} flag">
          <p>Capital: ${data[0].capital[0]}</p>
          <p>Region: ${data[0].region}</p>
          <p>Subregion: ${data[0].subregion}</p>
          <p>Population: ${data[0].population}</p>
          <p>Area: ${data[0].area} sq km</p>`;
      return data[0].region;
    })
    .then((region) => {
      fetch("https://restcountries.com/v3.1/region/" + region)
        .then((response) => response.json())
        .then((data) => {
        let regionCountries = document.getElementById("region_countries");
        regionCountries.innerHTML = "<h2>Countries in the same region:</h2>";
        data.forEach((country) => {regionCountries.innerHTML += 
          `<p>${country.name.common}</p>
          <img src="${country.flags.png}" alt="${country.name.common} flag">`;
          });
        });
    });
});