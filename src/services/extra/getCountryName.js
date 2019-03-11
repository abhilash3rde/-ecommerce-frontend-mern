import { AllCountryObj } from "./";
export const getCountryName = code => {
  let country = AllCountryObj.map(el => {
    if (el.code === code) {
      return el.name;
    }

    return null;
  });
  // console.log({code})
  return country.join("");
};
