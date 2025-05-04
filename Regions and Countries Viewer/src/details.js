const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("country");
const url=`https://restcountries.com/v3.1/name/${country}?fullText=true`;

fetch(url)
  .then(response => response.json())
  .then(data => displayCountry(data[0]))
  .catch(error => {
    console.error("Error fetching data:", error);
    alert("There was an issue fetching the data. Please try again.");
  });

function displayCountry(country) {
  let details = document.querySelector(".details-country");
  let flag = document.createElement('img');
  flag.src = country.flags.png;
  flag.alt = country.flags.alt;

  let countryName = document.createElement('h3');
  countryName.textContent = country.name.common;

  let favoriteCountries = JSON.parse(localStorage.getItem("favorites")) || [];

  const heartIcon = document.getElementById("heart-icon");
  heartIcon.src = favoriteCountries.includes(country.name.common) 
      ? "../public/favorite-icon-filled.png" 
      : "../public/favorite-icon-unfilled.svg";

  heartIcon.addEventListener("click", function () {
  if (favoriteCountries.includes(country.name.common)) {
        favoriteCountries = favoriteCountries.filter((fav) => {
        fav !== country.name.common;
  });
    localStorage.setItem("favorites", JSON.stringify(favoriteCountries));
    heartIcon.src = "../public/favorite-icon-unfilled.svg";
  } else {
    favoriteCountries.push(country.name.common);
    localStorage.setItem("favorites", JSON.stringify(favoriteCountries));
    heartIcon.src = "../public/favorite-icon-filled.png";
    }
  });

  details.appendChild(flag);
  details.appendChild(countryName);

  document.getElementById("capital").textContent = country.capital ? country.capital[0] : "No data";
  document.getElementById("area").textContent = country.area || "No data";
  document.getElementById("timezones").textContent = country.timezones ? country.timezones.join(", ") : "No data";
  document.getElementById("languages").textContent = country.languages ? Object.values(country.languages).join(", ") : "No data";
  document.getElementById("currencies").textContent = country.currencies ? Object.values(country.currencies).map(el => el.name).join(", ") : "No data";
  document.getElementById("neighbours").textContent = country.borders ? country.borders.join(", ") : "No data";
}
