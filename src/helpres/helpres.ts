export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const setLocalStorageCities = (cityName: string): void => {
  let allCities = localStorage.getItem("cities");
  const newCities = allCities === null ? cityName : allCities + "," + cityName;
  localStorage.setItem("cities", newCities);
};

export const getLocalStorageCities = (): Array<string> => {
  const cities = localStorage.getItem("cities");
  const citiesArray = cities === null ? [] : cities.split(",");
  return citiesArray;
};

export const deleteCityFromLocalStorage = (cityName: string): void => {
  const cities = localStorage.getItem("cities");
  if (cities === null) {
    return;
  }
  const tempArr = cities.split(",");
  const indexToRemove = tempArr.indexOf(cityName);
  tempArr.splice(indexToRemove, 1);
  const newCities = tempArr.join(",");
  newCities
    ? localStorage.setItem("cities", newCities)
    : localStorage.removeItem("cities");
};
