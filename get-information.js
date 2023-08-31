const getAddressObject = require("./utils/getBaseAddress");
const generatePhoneNumbers = require("./utils/generatePhoneNumbers");
const getFullInformation = async () => {
  const phoneNumbers = generatePhoneNumbers(20);
  const addressObj = getAddressObject("JP");
};
