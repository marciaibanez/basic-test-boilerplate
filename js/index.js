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
						results.innerHTML = "";
            data.forEach((element) => {
							console.log(element)
              let card = document.createElement("div");
              card.setAttribute("class", "c-card");

              let cardLabel = document.createElement("img");
              cardLabel.setAttribute("class", "c-card__label");
							const cardLabelImage = new URL("/images/illustrations/staff-fav.png", import.meta.url);
              cardLabel.setAttribute("src", element.staff_favorite ? cardLabelImage : "");
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
              cardPriceSpan.textContent = "$" + element.price;
              cardPrice.appendChild(cardPriceSpan);

              let cardIcons = document.createElement("div");
              cardIcons.setAttribute("class", "c-card__icons");
              cardDetails.appendChild(cardIcons);

              let cardIconFirst = document.createElement("img");
							const toxicLogo = new URL("/images/icons/toxic.svg", import.meta.url);
							const petLogo = new URL("/images/icons/pet.svg", import.meta.url);
              cardIconFirst.setAttribute("src", element.toxicity ? toxicLogo : petLogo);
							cardIcons.appendChild(cardIconFirst);

              let cardIconSecond = document.createElement("img");
							const sunIconsMap = {
								no: new URL("/images/icons/no-sun.svg", import.meta.url),
								low: new URL("/images/icons/low-sun.svg", import.meta.url),
								high: highSunLogo = new URL("/images/icons/high-sun.svg", import.meta.url)
							}
              cardIconSecond.setAttribute("src", sunIconsMap[element.sun]);
							cardIcons.appendChild(cardIconSecond);

							let cardIconThird = document.createElement("img");
							const waterIconsMap = {
								rarely: new URL("/images/icons/1-drop.svg", import.meta.url),
								regularly: new URL("/images/icons/2-drops.svg", import.meta.url),
								daily: highSunLogo = new URL("/images/icons/3-drops.svg", import.meta.url)
							}
              cardIconThird.setAttribute("src", waterIconsMap[element.water]);
							cardIcons.appendChild(cardIconThird);

              results.appendChild(card);
            });
          }
        });
    }
  })
);
