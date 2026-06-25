const axios = require("axios");

function createApiClient(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    },
    validateStatus: () => true
  });
}

module.exports = { createApiClient };
