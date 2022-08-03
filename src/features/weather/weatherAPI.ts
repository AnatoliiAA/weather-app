import { capitalizeFirstLetter } from "../../helpres/helpres";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "1f1c066d9c9d663b87a20095a5d363c8";

export const fetchByName = async (city: string) => {
  try {
    const cityName = capitalizeFirstLetter(city);
    const requestUrl = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
