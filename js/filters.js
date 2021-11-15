const filters = document.querySelectorAll("#form-filters select");
const noResults = document.querySelector("#no-results-container");
const results = document.querySelector("#results-container");
const sectionResults = document.querySelector("#section-results");
const params = {};

filters.forEach((element) =>
  element.addEventListener("change", function () {
    params[this.name] = this.value;

    if (params.sun && params.water && params.pets) {
      const queryString = new URLSearchParams(params).toString();
      fetch(
        `https://front-br-challenges.web.app/api/v2/green-thumb?${queryString}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            noResults.style.display = "none";
            sectionResults.style.display = "block";
            data.forEach((element) => {
							console.log(element)
              let card = document.createElement("div");
              card.setAttribute("class", "c-card");

              let cardLabel = document.createElement("img");
              cardLabel.setAttribute("class", "c-card__label");
              cardLabel.setAttribute(
                "src",
                "images/illustrations/staff-fav.png"
              );
              card.appendChild(cardLabel);

              let cardImage = document.createElement("img");
              cardImage.setAttribute("class", "c-card__image");
              cardImage.setAttribute(
                "src",
                element.url
              );
              card.appendChild(cardImage);

              let cardContent = document.createElement("div");
              cardContent.setAttribute("class", "c-card__content");
              card.appendChild(cardContent);

              let cardTitle = document.createElement("h3");
              cardTitle.setAttribute("class", "c-card__title");
              cardTitle.textContent = element.name;
              cardContent.appendChild(cardTitle);

              let cardDetails = document.createElement("div");
              cardDetails.setAttribute("class", "c-card__details");
              cardContent.appendChild(cardDetails);

              let cardPrice = document.createElement("div");
              cardPrice.setAttribute("class", "c-card__price");
              cardDetails.appendChild(cardPrice);

              let cardPriceSpan = document.createElement("span");
              cardPriceSpan.textContent = element.price;
              cardPrice.appendChild(cardPriceSpan);

              let cardIcons = document.createElement("div");
              cardIcons.setAttribute("class", "c-card__icons");
              cardDetails.appendChild(cardIcons);

              let cardIconFirst = document.createElement("img");
              cardIconFirst.setAttribute("src", new URL(element.toxicity ? "images/icons/toxic.svg" : "images/icons/pet.svg", import.meta.url));
							cardIcons.appendChild(cardIconFirst);

              let cardIconSecond = document.createElement("img");
              cardIconSecond.setAttribute("src", "images/icons/pet.svg");

              let cardIconThird = document.createElement("img");
              cardIconThird.setAttribute("src", "images/icons/no-sun.svg");

              results.appendChild(card);
            });
          }
        });
    }
  })
);
