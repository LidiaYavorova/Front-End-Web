const urlParams = new URLSearchParams(window.location.search);
const region = urlParams.get("region");
let countries = [];
let filteredCountries = [];
const url = `https://restcountries.com/v3.1/region/${region}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            countries = data;
            filteredCountries = data;
            displayCountries(countries);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("There was an issue fetching the data. Please try again.");
        });

function displayCountries(countries) {
    const countriesList = document.getElementById("country-cards");
    countriesList.innerHTML = '';
    let favoriteCountries = JSON.parse(localStorage.getItem("favorites")) || [];
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("card");

        const countryImg = document.createElement("img");
        countryImg.classList.add("country-img");
        countryImg.src = country.flags.png;
        countryImg.alt = country.flags.alt;

        const details = document.createElement("div");
        details.classList.add("details");

        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;

        const heartIcon = document.createElement("img");
        heartIcon.classList.add("heart-icon");
        heartIcon.src = favoriteCountries.includes(country.name.common)
            ? "../public/favorite-icon-filled.png" 
            : "../public/favorite-icon-unfilled.svg";
        heartIcon.alt = "favorite-icon";

        heartIcon.addEventListener("click", function () {
            if (favoriteCountries.includes(country.name.common)) {
                favoriteCountries = favoriteCountries.filter((fav) => {
                    fav !== country.name.common;
            });
                heartIcon.src = "../public/favorite-icon-unfilled.svg";
            } else {
                favoriteCountries.push(country.name.common);
                heartIcon.src = "../public/favorite-icon-filled.png"; 
            }
            localStorage.setItem("favorites", JSON.stringify(favoriteCountries));
        });

        const checkButton = document.createElement("button");
        checkButton.textContent = "Check country";
        checkButton.addEventListener("click", function() {
            window.location.href = `details.html?country=${country.name.common}`;
        });

        details.appendChild(countryName);
        details.appendChild(heartIcon);

        card.appendChild(countryImg);
        card.appendChild(details);
        card.appendChild(checkButton);

        countriesList.appendChild(card);
    });
}

document.getElementById("apply-button").addEventListener("click", (e)=>{
    e.preventDefault();
    const selectedSort = document.querySelector('input[name="filter"]:checked');
    if (selectedSort.value=="Ascending") {
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else {
        filteredCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
    }
    displayCountries(filteredCountries);
})

document.getElementById("input-filter").addEventListener("input", function (e) {
    const searchValue = e.target.value.toLowerCase();
    filteredCountries = countries.filter((country) =>{
        country.name.common.toLowerCase().startsWith(searchValue);
});
    displayCountries(filteredCountries);
});