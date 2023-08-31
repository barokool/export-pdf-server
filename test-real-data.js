const axios = require("axios");

async function searchAddressesInCity() {
  const baseUrl =
    "https://nominatim.openstreetmap.org/search?format=json&country=Japan&city=Tokyo";
  const format = "json";
  const country = "Japan";
  const params = {
    q: "Tokyo",
    country: country,
    format: format,
  };

  try {
    const response = await axios.get(baseUrl, { params });
    console.log(response.data);
  } catch (error) {
    console.error("Error searching addresses:", error);
    return [];
  }
}

searchAddressesInCity();
