function generatePhoneNumbers(count) {
  const areaCodes = ["705", "805", "905"];
  const phoneNumbers = [];

  for (let i = 0; i < count; i++) {
    const countryCode = "+81"; // Japan country code
    const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    const firstPart = generateNumber(3);
    const secondPart = generateNumber(4);

    const phoneNumber = `${countryCode}-${areaCode}-${firstPart}-${secondPart}`;

    phoneNumbers.push({ PhoneNumber: phoneNumber });
  }

  return phoneNumbers;
}

function generateNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generatePhoneNumbers;
