const axios = require("axios");

const getMoreAddress = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=en&boundary=postal_code`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getMoreAddress;
