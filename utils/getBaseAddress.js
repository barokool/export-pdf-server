const cheerio = require("cheerio");
const axios = require("axios");
const getMoreAddress = require("./getMoreAddress");

const getAddressObject = async (country) => {
  const response = await axios.post(
    "https://generate.plus/en/address/japan-jp",
    {
      gp_address_base: {
        card: "single",
        country: country || "JP",
      },
    }
  );

  const html = response.data;
  const $ = cheerio.load(html);
  const cardSingleContent = $("#card-single").html();
  const content$ = cheerio.load(cardSingleContent);

  let street = content$("#street").text().trim();
  if (street.lastIndexOf("*") > 0) {
    street = street.slice(0, -1);
  }

  let locality = content$("#locality").text().trim();
  if (locality.lastIndexOf("*") > 0) {
    locality = locality.slice(0, -1);
  }

  const country = content$(".col-sm-8")
    .filter((_, element) => $(element).text().includes("Japan"))
    .text()
    .trim();

  const latLonText = content$("#latlng-map").text().trim();
  const [lat, lon] = latLonText.split(",");
  const moreAddress = await getMoreAddress(lat, lon);
  const { road, quarter, province, city } = moreAddress.address;
  const obj = {
    street,
    locality,
    country,
    lat,
    lon,
    country_code: moreAddress.address.country_code || "",
    road: road || "",
    quarter: quarter || "",
    province: province || "",
    city: city || "",
    postal_code: moreAddress.address.postcode || "388-8011",
    display_Name: moreAddress.display_name || "",
  };

  return obj;
};

module.exports = getAddressObject;
