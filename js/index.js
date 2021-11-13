import axios from "axios";

function getSuggestedPlant(sun, water, pets) {
  return axios.get("https://front-br-challenges.web.app/api/v2/green-thumb", {
    params: {
      sun,
      water,
      pets,
    },
  });
}
